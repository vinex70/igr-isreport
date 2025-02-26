import { useEffect } from "react";
import { Link } from "react-router-dom";
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

const ProgramHo = () => {
    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "s") { // ⌘ + S
                event.preventDefault();
                alert("Settings shortcut triggered!"); // Ganti dengan aksi yang diinginkan
            }
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "e") { // ⌘ + B
                event.preventDefault();
                window.location.href = "/cpg-vite/evaluasi-sales"; // Navigasi manual
            }
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "i") { // ⌘ + T
                event.preventDefault();
                window.location.href = "/cpg-vite/informasi-promosi"; // Navigasi manual
            }
        };

        document.addEventListener("keydown", handleShortcut);
        return () => {
            document.removeEventListener("keydown", handleShortcut);
        };
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
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
                    {/* <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProgramHo;
