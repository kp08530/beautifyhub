
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onSelect?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  placeholder?: string
}

export function DatePicker({ date, setDate, onSelect, className, disabled, placeholder = "選擇日期" }: DatePickerProps) {
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelect) {
      onSelect(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export function DateRangePicker() {
  const [from, setFrom] = React.useState<Date>()
  const [to, setTo] = React.useState<Date>()

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <DatePicker
        date={from}
        setDate={setFrom}
        placeholder="開始日期"
      />
      <DatePicker
        date={to}
        setDate={setTo}
        placeholder="結束日期"
      />
    </div>
  )
}
