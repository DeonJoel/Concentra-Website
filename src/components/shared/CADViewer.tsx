"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MousePointer2, ZoomIn, ZoomOut, Maximize, Loader2, FileWarning } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfOptions = { withCredentials: true };

export default function CADViewer({ fileUrl }: { fileUrl: string }) {
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [hasError, setHasError] = useState(false);

  function onDocumentLoadSuccess() {
    setHasError(false);
  }

  function onDocumentLoadError() {
    setHasError(true);
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 relative overflow-hidden">

      {/* TOOLBAR */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur shadow-lg border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2">
        <button
          onClick={() => setIsZoomMode(false)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${!isZoomMode
              ? "bg-concentra-purple text-white shadow-md"
              : "text-slate-500 hover:bg-slate-100"
            }`}
        >
          <MousePointer2 className="w-4 h-4" /> Standard Scroll
        </button>
        <button
          onClick={() => setIsZoomMode(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${isZoomMode
              ? "bg-concentra-green text-white shadow-md"
              : "text-slate-500 hover:bg-slate-100"
            }`}
        >
          <ZoomIn className="w-4 h-4" /> Zoom / Pan Mode
        </button>
      </div>

      {/* INTERACTIVE VIEWER */}
      <div className={`flex-1 h-full w-full relative ${isZoomMode ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}>
        {hasError ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <FileWarning className="w-12 h-12 mb-3 text-red-400" />
            <p className="font-bold text-slate-600">Failed to load PDF</p>
            <p className="text-sm">The file may be corrupted or unavailable.</p>
          </div>
        ) : (
          <TransformWrapper
            disabled={!isZoomMode}
            wheel={{ step: 0.05, disabled: !isZoomMode }} // FIX 3: Granular, smoother zoom steps
            panning={{ disabled: !isZoomMode }}
            limitToBounds={false} // FIX 4: Allows panning to ANY point, even past edges
            centerOnInit={true}
            initialScale={1}
            minScale={0.2}
            maxScale={15} // Allows massive zoom-ins for tiny CAD tolerances
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* These inline styles force the wrapper to respect the container boundaries */}
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Document
                    file={fileUrl}
                    options={pdfOptions}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="flex items-center justify-center w-full h-full p-4"
                    loading={
                      <div className="flex flex-col items-center justify-center text-slate-400 h-full w-full">
                        <Loader2 className="w-10 h-10 animate-spin mb-4 text-concentra-purple" />
                        <p className="font-medium text-slate-600">Decrypting & Rendering...</p>
                        <p className="text-xs mt-2">Connecting to secure stream</p>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={3} // FIX 1: Crisp high-res rendering
                      // FIX 2: CSS overrides to force the massive CAD canvas to shrink to the container
                      className="shadow-2xl border border-slate-300 bg-white flex justify-center items-center [&>canvas]:!max-w-full [&>canvas]:!max-h-full [&>canvas]:!w-auto [&>canvas]:!h-auto"
                    />
                  </Document>
                </TransformComponent>

                {/* Quick Action Zoom Buttons */}
                {isZoomMode && (
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
                    <button onClick={() => zoomIn(0.2)} className="p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:text-concentra-purple hover:bg-slate-50 transition">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button onClick={() => zoomOut(0.2)} className="p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:text-concentra-purple hover:bg-slate-50 transition">
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button onClick={() => resetTransform()} className="p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:text-concentra-purple hover:bg-slate-50 transition">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </TransformWrapper>
        )}
      </div>
    </div>
  );
}