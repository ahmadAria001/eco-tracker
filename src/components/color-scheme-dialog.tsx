import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeColors } from "@/lib/utils/color"

interface ColorSchemeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editMode: boolean
  newSchemeName: string
  setNewSchemeName: (name: string) => void
  newSchemeColors: ThemeColors
  onColorChange: (key: keyof ThemeColors, value: string) => void
  onSave: () => void
}

export function ColorSchemeDialog({
  open,
  onOpenChange,
  editMode,
  newSchemeName,
  setNewSchemeName,
  newSchemeColors,
  onColorChange,
  onSave,
}: ColorSchemeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Color Scheme' : 'Create New Color Scheme'}</DialogTitle>
          <DialogDescription>
            {editMode ? 'Edit your custom color scheme by adjusting the colors below.' : 'Create your own custom color scheme by adjusting the colors below.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scheme-name" className="text-right">
              Name
            </Label>
            <Input
              id="scheme-name"
              value={newSchemeName}
              onChange={(e) => setNewSchemeName(e.target.value)}
              className="col-span-3"
            />
          </div>
          {Object.entries(newSchemeColors).map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {key}
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: value }} />
                <Input
                  id={key}
                  type="color"
                  value={value}
                  onChange={(e) => onColorChange(key as keyof ThemeColors, e.target.value)}
                  className="w-12"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => onColorChange(key as keyof ThemeColors, e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            Save Scheme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 