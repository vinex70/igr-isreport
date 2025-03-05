import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const ProgramHo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Menutup dropdown ketika klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white" onClick={handleToggleDropdown}>
                        Web HO <IoMdArrowDropdown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Program HO</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link to="http://192.168.226.190:81/login" target="_blank">IAS PHP</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="http://172.20.30.3/ESS/HomePortal/Login" target="_blank">ESS</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="http://172.20.30.3/tsm/" target="_blank">TSM 1</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="http://172.20.30.4/tsm/" target="_blank">TSM 2</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="http://172.20.30.5/tsm/" target="_blank">TSM 3</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProgramHo;
