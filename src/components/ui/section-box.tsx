import { ReactNode } from "react";

interface SectionBoxProps {
    title: string;
    children: ReactNode;
}

const SectionBox = ({ title, children }: SectionBoxProps) => {
    return (
        <div className="flex flex-col items-center border border-blue-500 rounded-b-xl p-4 relative shadow-lg my-2">
            <p className="absolute -top-4 left-5 bg-white px-1 text-blue-500 text-xl font-semibold">
                {title}
            </p>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default SectionBox;
