"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-muted animate-pulse" />,
});

const MapWrapper = () => {
    return <InteractiveMap />;
};

export default MapWrapper;
