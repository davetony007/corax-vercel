"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-muted animate-pulse" />,
});

const MapWrapper = () => {
    return (
        <Suspense fallback={<div className="h-[500px] w-full bg-muted animate-pulse rounded-xl" />}>
            <InteractiveMap />
        </Suspense>
    );
};

export default MapWrapper;
