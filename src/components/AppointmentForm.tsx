
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useNavigate } from "react-router-dom";

interface AppointmentFormProps {
  serviceId: string;
  serviceTitle: string;
  businessId: string;
  businessName: string;
  onSuccess?: () => void;
}

const AppointmentForm = ({
  serviceId,
  serviceTitle,
  businessId,
  businessName,
  onSuccess,
}: AppointmentFormProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "預約服務前請先登入您的帳號",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!date || !time) {
      toast({
        title: "請選擇日期和時間",
        description: "預約前請選擇有效的日期和時間",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "預約成功",
        description: `您已成功預約 ${businessName} 的 ${serviceTitle} 服務`,
      });

      // Reset form
      setDate("");
      setTime("");
      setNotes("");
      setIsSubmitting(false);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  // Available time slots
  const availableTimeSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Get current date for min value on date picker
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">選擇日期</Label>
        <Input
          id="date"
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">選擇時間</Label>
        <Select value={time} onValueChange={setTime} required>
          <SelectTrigger id="time">
            <SelectValue placeholder="選擇時間" />
          </SelectTrigger>
          <SelectContent>
            {availableTimeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!isAuthenticated && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">您的姓名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">電子郵件</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">手機號碼</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">備註 (選填)</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "預約中..." : "確認預約"}
      </Button>
    </form>
  );
};

export default AppointmentForm;
