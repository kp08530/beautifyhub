
// Update the RestDay interface
interface RestDay {
  id: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

// Update the newRestDay state:
const [newRestDay, setNewRestDay] = useState<Omit<RestDay, 'id'>>({ 
  startDate: '', 
  endDate: '', 
  reason: '' 
});

// Update the rest day dialog content:
<Dialog open={showAddRestDayDialog} onOpenChange={setShowAddRestDayDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>新增休息日</DialogTitle>
      <DialogDescription>設定店家的休息日或特殊營業時間</DialogDescription>
    </DialogHeader>
    
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">開始日期</label>
        <Input
          type="date"
          value={newRestDay.startDate}
          onChange={(e) => setNewRestDay(prev => ({ ...prev, startDate: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">結束日期</label>
        <Input
          type="date"
          value={newRestDay.endDate}
          onChange={(e) => setNewRestDay(prev => ({ ...prev, endDate: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">原因 (選填)</label>
        <Input
          type="text"
          value={newRestDay.reason}
          onChange={(e) => setNewRestDay(prev => ({ ...prev, reason: e.target.value }))}
          placeholder="例如：國定假日、內部訓練..."
        />
      </div>
    </div>
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setShowAddRestDayDialog(false)}>取消</Button>
      <Button onClick={handleAddRestDay}>新增</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Update the rest days display in the settings tab:
<table className="w-full">
  <thead className="bg-gray-50 text-left text-xs">
    <tr>
      <th className="px-4 py-2">起始日期</th>
      <th className="px-4 py-2">結束日期</th>
      <th className="px-4 py-2">原因</th>
      <th className="px-4 py-2">操作</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    {restDays.map(restDay => (
      <tr key={restDay.id}>
        <td className="px-4 py-2">{restDay.startDate}</td>
        <td className="px-4 py-2">{restDay.endDate}</td>
        <td className="px-4 py-2">{restDay.reason || '休息日'}</td>
        <td className="px-4 py-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDeleteRestDay(restDay.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
