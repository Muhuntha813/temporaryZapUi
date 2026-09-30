import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, Loader2, Trash2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { getAuthHeaders } from '../utils/session';
import { countPdfPagesClient } from '../utils/pdf';
import { API_URL, fetchWithTimeout } from '../utils/api';
import SEOHead from '../components/SEOHead';
import OrderSteps from '../components/OrderSteps';
import PromoStrip from '../components/PromoStrip';

interface FileConfig {
  id: string;
  originalFilename: string;
  displayPageCount?: number;
  zapInternalPageValue?: number;
  pageCount?: number;
  liveEstimate?: number;
  colorMode: 'B_AND_W' | 'COLOR';
  sides: 'FRONT_AND_BACK' | 'FRONT_ONLY';
  serviceType: 'A4_DOCUMENT' | 'SOFT_BINDING';
  copies: number;
  processingStatus: 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';
  errorMessage?: string;
}

const OrderBuilder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState<FileConfig[]>([]);
  const [pollingList, setPollingList] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Business Controls & Notices
  const [activeBanner, setActiveBanner] = useState<any>(null);
  const [activeHoliday, setActiveHoliday] = useState<any>(null);
  const [deliveryEstimation, setDeliveryEstimation] = useState<any>(null);
  const [workingCalendar, setWorkingCalendar] = useState<any>(null);
  const [isSoftBindingEnabled, setIsSoftBindingEnabled] = useState<boolean>(true);
  const [softBindingPrice, setSoftBindingPrice] = useState<number>(35);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(false);

  useEffect(() => {
    fetchWithTimeout(`${API_URL}/config`)
      .then(res => res.json())
      .then(data => {
        if (data.activeBanner) {
          setActiveBanner(data.activeBanner);
        }
        if (data.deliveryEstimation) {
          setDeliveryEstimation(data.deliveryEstimation);
        }
        if (data.workingCalendar) {
          setWorkingCalendar(data.workingCalendar);
        }
        if (data.pricingRules && Array.isArray(data.pricingRules)) {
          const bindingRule = data.pricingRules.find((r: any) => r.ruleKey === 'SOFT_BINDING');
          if (bindingRule) {
            setIsSoftBindingEnabled(true);
            setSoftBindingPrice(Number(bindingRule.price) || 35);
          } else {
            setIsSoftBindingEnabled(false);
          }
        }
        if (data.holidays && Array.isArray(data.holidays)) {
          // Find if any holiday is current or imminent
          const todayStr = new Date().toISOString().split('T')[0];
          const curr = data.holidays.find((h: any) => todayStr >= h.startDate && todayStr <= h.endDate);
          if (curr) setActiveHoliday(curr);
        }
      })
      .catch(err => console.error('Failed to load business controls config:', err));
  }, []);

  // Handle re-order configuration preload
  useEffect(() => {
    if (location.state?.reorderItems) {
      const items = location.state.reorderItems;
      const preloadedConfigs: FileConfig[] = items.map((item: any, idx: number) => {
        const pCount = item.pageCount || 1;
        return {
          id: `preload-${idx}-${Date.now()}`,
          originalFilename: item.originalFilename,
          displayPageCount: pCount,
          zapInternalPageValue: pCount,
          pageCount: pCount,
          liveEstimate: undefined,
          colorMode: item.colorMode || 'B_AND_W',
          sides: item.sides || 'FRONT_ONLY',
          serviceType: item.serviceType || 'A4_DOCUMENT',
          copies: item.copies || 1,
          processingStatus: 'READY'
        };
      });
      setFiles(preloadedConfigs);
      // Trigger estimate calculation
      preloadedConfigs.forEach(item => {
        calculateLiveEstimate(item.id, item.colorMode, item.sides, item.serviceType, item.copies, item.zapInternalPageValue || 1);
      });
    }
  }, [location.state]);

  const processFiles = async (rawFiles: File[]) => {
    if (!rawFiles || rawFiles.length === 0) return;

    for (const file of rawFiles) {
      const tempId = 'temp-' + Math.random().toString(36).substring(2, 9);
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      // Requirement 2: Default Sides to FRONT_ONLY
      const newFileConfig: FileConfig = {
        id: tempId,
        originalFilename: file.name,
        colorMode: 'B_AND_W',
        sides: 'FRONT_ONLY',
        serviceType: 'A4_DOCUMENT',
        copies: 1,
        processingStatus: 'UPLOADING'
      };

      setFiles(prev => [...prev, newFileConfig]);

      let detectedPageCount: number | null = null;
      if (isPdf) {
        try {
          detectedPageCount = await countPdfPagesClient(file);
        } catch (err: any) {
          console.error('PDF page count failed for', file.name, err);
          setFiles(prev => prev.map(f => f.id === tempId ? {
            ...f,
            processingStatus: 'FAILED',
            errorMessage: "Couldn't read the page count for this PDF. Please try another file."
          } : f));
          continue;
        }
      }

      const displayPageCount = detectedPageCount ?? undefined;
      const zapInternalPageValue = detectedPageCount ?? undefined;

      const formData = new FormData();
      formData.append('file', file);
      if (zapInternalPageValue !== undefined) {
        formData.append('pageCount', zapInternalPageValue.toString());
      }

      try {
        const authHeaders = await getAuthHeaders();
        const res = await fetch(`${API_URL}/files/upload`, {
          method: 'POST',
          headers: {
            ...authHeaders
          },
          body: formData
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Upload failed');
        }

        const data = await res.json();
        const finalPageCount = zapInternalPageValue ?? data.pageCount;

        setFiles(prev => prev.map(f => f.id === tempId ? {
          ...f,
          id: data.id,
          displayPageCount: displayPageCount ?? data.pageCount,
          zapInternalPageValue: zapInternalPageValue ?? data.pageCount,
          pageCount: finalPageCount,
          processingStatus: data.status,
          errorMessage: data.errorMessage
        } : f));

        if (data.status === 'READY') {
          // Immediately compute estimate with FRONT_ONLY default
          calculateLiveEstimate(data.id, 'B_AND_W', 'FRONT_ONLY', 'A4_DOCUMENT', 1, finalPageCount);
        } else if (data.status === 'PROCESSING') {
          setPollingList(prev => [...prev, data.id]);
        }
      } catch (err: any) {
        setFiles(prev => prev.map(f => f.id === tempId ? {
          ...f,
          processingStatus: 'FAILED',
          errorMessage: err.message
        } : f));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);
    await processFiles(uploadedFiles);
    // Reset input value so same files can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only toggle off if leaving the drop container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      await processFiles(droppedFiles);
    }
  };

  // Poll processing files
  useEffect(() => {
    if (pollingList.length === 0) return;

    const interval = setInterval(async () => {
      const activePolls = [...pollingList];
      for (const id of activePolls) {
        try {
          const authHeaders = await getAuthHeaders();
          const res = await fetch(`${API_URL}/files/${id}/status`, {
            headers: authHeaders
          });
          if (res.ok) {
            const data = await res.json();
            if (data.processingStatus !== 'PROCESSING') {
              setFiles(prev => prev.map(f => f.id === id ? {
                ...f,
                processingStatus: data.processingStatus,
                pageCount: data.pageCount,
                errorMessage: data.errorMessage
              } : f));
              setPollingList(prev => prev.filter(pId => pId !== id));

              if (data.processingStatus === 'READY') {
                setFiles(currentFiles => {
                  const currentFile = currentFiles.find(f => f.id === id);
                  if (currentFile) {
                    calculateLiveEstimate(id, currentFile.colorMode, currentFile.sides, currentFile.serviceType, currentFile.copies, data.pageCount);
                  } else {
                    calculateLiveEstimate(id, 'B_AND_W', 'FRONT_ONLY', 'A4_DOCUMENT', 1, data.pageCount);
                  }
                  return currentFiles;
                });
              }
            }
          }
        } catch (err) {
          console.error('Status check failed', err);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [pollingList, files]);

  /**
   * Persist file config and fetch live price estimate using the existing
   * PATCH /order-items/:id/config endpoint, which calculates pricing server-side
   * and returns { liveEstimate } in the response.
   */
  const calculateLiveEstimate = async (id: string, colorMode: string, sides: string, serviceType: string, copies: number, _pageCount?: number) => {
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`${API_URL}/order-items/${id}/config`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({ colorMode, sides, serviceType, copies })
      });

      if (res.ok) {
        const data = await res.json();
        setFiles(prev => prev.map(f => f.id === id ? { ...f, liveEstimate: data.liveEstimate } : f));
      }
    } catch (e) {
      console.error('Pricing update failed', e);
    }
  };

  const updateFileConfig = (id: string, updates: Partial<FileConfig>) => {
    setFiles(prev => prev.map(f => {
      if (f.id !== id) return f;
      const nextFile = { ...f, ...updates };
      // Persist config and refresh estimate via PATCH /order-items/:id/config
      calculateLiveEstimate(
        id,
        nextFile.colorMode,
        nextFile.sides,
        nextFile.serviceType,
        nextFile.copies
      );
      return nextFile;
    }));
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleCheckout = () => {
    const ids = files.filter(f => f.processingStatus === 'READY').map(f => f.id);
    navigate('/checkout', { state: { orderItemIds: ids } });
  };

  const allReady = files.length > 0 && files.every(f => f.processingStatus === 'READY');

  const totalEstimate = files.reduce((sum, f) => sum + (f.liveEstimate || 0), 0);
  const totalPages = files.reduce((sum, f) => sum + ((f.pageCount || f.displayPageCount || 1) * (f.copies || 1)), 0);
  const totalCopies = files.reduce((sum, f) => sum + (f.copies || 1), 0);
  const hasSoftBinding = files.some(f => f.serviceType === 'SOFT_BINDING');

  const readyCount = files.filter(f => f.processingStatus === 'READY').length;

  return (
    <div className={`flow-page ${files.length > 0 ? 'has-mobile-cta' : ''}`}>
      <SEOHead
        title="Upload &amp; Customize Campus Print Order | ZapPrints"
        description="Upload PDF documents or images, configure copies, B&amp;W or color, single-sided or duplex, and get an instant live price estimate for campus pickup."
        canonicalPath="/order"
      />
      <div className="container">

        {/* Page header */}
        <div className="flow-hero">
          <div>
            <h1 className="flow-title rise">Build your <span className="serif-accent">order.</span></h1>
            <p className="flow-sub rise" style={{ '--d': '80ms' } as React.CSSProperties}>
              Upload your files, choose colour, sides and copies, and watch the price update live.
            </p>
          </div>
          <OrderSteps current={files.length > 0 ? 2 : 1} />
        </div>

        {/* Promotional / announcement banner */}
        {activeBanner && !isBannerDismissed && (
          <PromoStrip banner={activeBanner} onDismiss={() => setIsBannerDismissed(true)} />
        )}

        {/* Holiday / leave notice */}
        {(activeHoliday || (deliveryEstimation?.activeHolidayNotice)) && (
          <div className="notice warn" role="status">
            <div>
              <h4>We're on a short break</h4>
              <p>
                {activeHoliday?.message || deliveryEstimation?.activeHolidayNotice || "Orders can still be placed during this period."}
                {deliveryEstimation?.formattedDate && (
                  <strong style={{ display: 'block', marginTop: '0.25rem' }}>
                    Printing &amp; campus deliveries resume: {deliveryEstimation.formattedDate}.
                  </strong>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Weekly working calendar */}
        {workingCalendar && (
          <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginTop: '1rem' }}>
            <span className="eyebrow"><b>Delivery days</b></span>
            <div className="week">
              {[
                { label: 'Mon', key: 'monday' },
                { label: 'Tue', key: 'tuesday' },
                { label: 'Wed', key: 'wednesday' },
                { label: 'Thu', key: 'thursday' },
                { label: 'Fri', key: 'friday' },
                { label: 'Sat', key: 'saturday' },
                { label: 'Sun', key: 'sunday' },
              ].map(day => {
                const isOpen = Boolean((workingCalendar as any)[day.key]);
                return (
                  <span key={day.key} className={isOpen ? 'open' : ''} title={isOpen ? 'Delivering' : 'Closed'}>
                    {day.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className={`order-builder-layout ${files.length > 0 ? 'has-files' : 'empty-state'}`}>

          {/* LEFT: upload + file configuration */}
          <div className="order-builder-left">

            {/* Drag & drop upload */}
            <div
              className={`upload-dropzone ${files.length > 0 ? 'compact' : ''} ${isDragActive ? 'drag-active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Upload files"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="up-mark"><Upload size={20} /></span>
              {files.length === 0 && <span className="up-corner">PDF · PNG · JPG · 50MB</span>}
              <span className="up-big">
                {isDragActive ? 'Drop to upload.' : files.length > 0 ? 'Add more files' : <>Drop files here,<br />or tap to browse.</>}
              </span>
              {files.length > 0 && <span className="mono" style={{ color: 'var(--text-muted)' }}>PDF · PNG · JPG</span>}
              <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/png,image/jpeg"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>

            {/* File ledger */}
            {files.length > 0 && (
              <div>
                <div className="files-head">
                  <h2>Your files ({files.length})</h2>
                  <span className="eyebrow">{readyCount} of {files.length} ready</span>
                </div>

                {files.map((fileConfig, idx) => (
                  <div key={fileConfig.id} className="file">
                    <div className="file-top">
                      <span className="n">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="file-name" title={fileConfig.originalFilename}>{fileConfig.originalFilename}</span>
                      <button type="button" className="icon-btn" onClick={() => removeFile(fileConfig.id)} title="Remove file" aria-label={`Remove ${fileConfig.originalFilename}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {fileConfig.processingStatus === 'UPLOADING' && (
                      <div className="file-state">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Uploading document…</span>
                      </div>
                    )}
                    {fileConfig.processingStatus === 'PROCESSING' && (
                      <div className="file-state">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Counting pages &amp; preparing estimate…</span>
                      </div>
                    )}
                    {fileConfig.processingStatus === 'FAILED' && (
                      <div className="file-state bad" role="alert">
                        <AlertCircle size={14} />
                        <span>Failed: {fileConfig.errorMessage}</span>
                      </div>
                    )}

                    {fileConfig.processingStatus === 'READY' && (
                      <>
                        <div className="file-state ok">
                          <CheckCircle2 size={14} />
                          {fileConfig.displayPageCount !== undefined
                            ? `${fileConfig.displayPageCount} ${fileConfig.displayPageCount === 1 ? 'page' : 'pages'} detected`
                            : (fileConfig.pageCount !== undefined ? `${fileConfig.pageCount} ${fileConfig.pageCount === 1 ? 'page' : 'pages'} detected` : 'Ready')}
                        </div>

                        <div className="file-opts">
                          {isSoftBindingEnabled && (
                            <div>
                              <span className="opt-label">Service</span>
                              <div className="seg" role="group" aria-label="Service type">
                                <button type="button" aria-pressed={fileConfig.serviceType === 'A4_DOCUMENT'} onClick={() => updateFileConfig(fileConfig.id, { serviceType: 'A4_DOCUMENT' })}>
                                  Print only
                                </button>
                                <button type="button" aria-pressed={fileConfig.serviceType === 'SOFT_BINDING'} onClick={() => updateFileConfig(fileConfig.id, { serviceType: 'SOFT_BINDING' })}>
                                  + Soft binding ₹{softBindingPrice}
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="opt-row">
                            <div>
                              <span className="opt-label">Colour</span>
                              <div className="seg" role="group" aria-label="Colour mode">
                                <button type="button" aria-pressed={fileConfig.colorMode === 'B_AND_W'} onClick={() => updateFileConfig(fileConfig.id, { colorMode: 'B_AND_W' })}>B&amp;W</button>
                                <button type="button" aria-pressed={fileConfig.colorMode === 'COLOR'} onClick={() => updateFileConfig(fileConfig.id, { colorMode: 'COLOR' })}>Colour</button>
                              </div>
                            </div>
                            <div>
                              <span className="opt-label">Sides</span>
                              <div className="seg" role="group" aria-label="Sides">
                                <button type="button" aria-pressed={fileConfig.sides === 'FRONT_ONLY'} onClick={() => updateFileConfig(fileConfig.id, { sides: 'FRONT_ONLY' })}>Single</button>
                                <button type="button" aria-pressed={fileConfig.sides === 'FRONT_AND_BACK'} onClick={() => updateFileConfig(fileConfig.id, { sides: 'FRONT_AND_BACK' })}>Duplex</button>
                              </div>
                            </div>
                          </div>

                          <div className="file-foot">
                            <div>
                              <span className="opt-label">Copies</span>
                              <div className="qty">
                                <button type="button" aria-label="Fewer copies" onClick={() => updateFileConfig(fileConfig.id, { copies: Math.max(1, fileConfig.copies - 1) })}>−</button>
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  aria-label="Copies"
                                  min="1"
                                  value={fileConfig.copies}
                                  onChange={e => updateFileConfig(fileConfig.id, { copies: Math.max(1, parseInt(e.target.value) || 1) })}
                                />
                                <button type="button" aria-label="More copies" onClick={() => updateFileConfig(fileConfig.id, { copies: fileConfig.copies + 1 })}>+</button>
                              </div>
                            </div>
                            <div className="est">
                              <span className="opt-label" style={{ marginBottom: '0.25rem' }}>File estimate</span>
                              {fileConfig.liveEstimate !== undefined
                                ? <div className="v">₹{fileConfig.liveEstimate.toFixed(2)}</div>
                                : <div className="v pending">Calculating…</div>}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empty state: what to expect (fills the space beside the drop area) */}
          {files.length === 0 && (
            <div className="ob-side">
              <div className="tb tb-white">
                <div className="tb-top"><span className="n">Files</span></div>
                <div><div className="tb-name">PDF, PNG, JPG</div><p className="tb-desc">Up to 50MB each. Word files aren&apos;t supported.</p></div>
              </div>
              <div className="tb tb-white">
                <div className="tb-top"><span className="n">Price</span></div>
                <div><div className="tb-name">Live estimate</div><p className="tb-desc">Pick colour, sides and copies and the total updates as you tap.</p></div>
              </div>
              <div className="tb tb-white">
                <div className="tb-top"><span className="n">Pickup</span></div>
                <div><div className="tb-name">Java Canteen</div><p className="tb-desc">Two pickup slots every day. Choose yours at checkout.</p></div>
              </div>
            </div>
          )}

          {/* RIGHT: order summary */}
          <div className="order-builder-right">
            <div className="summary">
              <div className="summary-head">
                <span className="mono"><b>Order summary</b></span>
                <span className="mono" style={{ color: 'var(--text-muted)' }}>Est.</span>
              </div>
              <div className="summary-body">
                <div className="dotrow"><span>Files</span><span>{files.length}</span></div>
                {files.length > 0 && (
                  <>
                    <div className="dotrow"><span>Total pages</span><span>{totalPages}</span></div>
                    <div className="dotrow"><span>Total copies</span><span>{totalCopies}</span></div>
                    {hasSoftBinding && (
                      <div className="dotrow"><span>Service</span><span style={{ color: 'var(--color-accent)' }}>Soft binding</span></div>
                    )}
                  </>
                )}
              </div>
              <div className="summary-total">
                <span className="mono">Estimated total</span>
                <span className="amt">₹{totalEstimate.toFixed(2)}</span>
              </div>
              <div className="summary-foot">
                <p className="hint">Delivery slot and pickup location are chosen at checkout.</p>
                {files.length > 0 ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-accent btn-lg btn-block"
                      disabled={!allReady}
                      onClick={handleCheckout}
                    >
                      Continue to checkout <ArrowRight size={18} data-arrow />
                    </button>
                    {!allReady && <p className="hint bad">Please wait for all files to finish processing.</p>}
                  </>
                ) : (
                  <div className="empty-note">Upload documents to see your live estimate.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      {files.length > 0 && (
        <div className="mobile-cta">
          <div className="t">
            <span className="mono">{allReady ? 'Estimated total' : 'Processing files…'}</span>
            <b>₹{totalEstimate.toFixed(2)}</b>
          </div>
          <button type="button" className="btn" disabled={!allReady} onClick={handleCheckout}>
            Checkout <ArrowRight size={16} data-arrow />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderBuilder;
