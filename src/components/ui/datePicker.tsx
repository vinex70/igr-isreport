import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerDemoProps {
    onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ onDateChange }: DatePickerDemoProps) {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        onDateChange(selectedDate); // Call the parent function
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "dd LLL, y") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                />
            </PopoverContent>
        </Popover>
    );
}
