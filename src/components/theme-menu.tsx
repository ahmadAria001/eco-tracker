import { Check, Moon, Palette, Pencil, Sun, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useThemeSettings, CustomColorScheme } from "@/app/components/custom/theme/ThemeSettingsContext"
import { ColorSchemeDialog } from "./color-scheme-dialog"
import { useState } from "react"
import { ThemeColors } from "@/lib/utils/color"
import { toast } from "sonner"

export function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  const { state, dispatch } = useThemeSettings()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingSchemeId, setEditingSchemeId] = useState<number | null>(null)
  const [newSchemeName, setNewSchemeName] = useState("")
  const [newSchemeColors, setNewSchemeColors] = useState<ThemeColors>({
    background: "#ffffff",
    primary: "#0ea5e9",
    secondary: "#f1f5f9",
  })

  // Handle color input changes
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setNewSchemeColors(prev => ({ ...prev, [key]: value }))
  }

  // Handle edit button click
  const handleEditClick = (scheme: CustomColorScheme, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(true)
    setEditingSchemeId(scheme.id)
    setNewSchemeName(scheme.name)
    setNewSchemeColors(scheme.colors)
    setDialogOpen(true)
  }

  const handleCreateNewScheme = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(false)
    setEditingSchemeId(null)
    setNewSchemeName("My Custom Color Scheme")
    setNewSchemeColors({
      background: "#ffffff",
      primary: "#0ea5e9",
      secondary: "#f1f5f9",
    })
    setDialogOpen(true)
  }

  // Save new color scheme
  const saveNewColorScheme = () => {
    if (!newSchemeName.trim()) {
      toast.error("Color scheme name cannot be empty", { richColors: true, duration: 3000 })
      return
    }

    if (editMode && editingSchemeId) {
      const updatedScheme = {
        id: editingSchemeId,
        name: newSchemeName,
        colors: newSchemeColors
      }
      dispatch({ type: 'UPDATE_CUSTOM_COLOR_SCHEME', payload: updatedScheme })
    } else {
      const newScheme = {
        id: Date.now(),
        name: newSchemeName,
        colors: newSchemeColors
      }
      dispatch({ type: 'ADD_CUSTOM_COLOR_SCHEME', payload: newScheme })
    }

    dispatch({ type: 'SET_COLOR_SCHEME', payload: 'custom' })
    setDialogOpen(false)
    setEditMode(false)
    setEditingSchemeId(null)
  }

  return (
    <>
      <DropdownMenuLabel>Mode</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun className="mr-2 h-4 w-4" />
        <span>Light</span>
        {theme === "light" && <Check className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon className="mr-2 h-4 w-4" />
        <span>Dark</span>
        {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <span>System</span>
        {theme === "system" && <Check className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => {
        dispatch({ type: 'SET_COLOR_SCHEME', payload: 'default' })
        dispatch({ type: 'SELECT_COLOR_SCHEME', payload: null })
      }}>
        <span>Default</span>
        {state.colorScheme === "default" && <Check className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>

      {state.customColorSchemes.length > 0 && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Custom Schemes</DropdownMenuLabel>
          {state.customColorSchemes.map((scheme) => (
            <DropdownMenuItem
              key={scheme.id}
              onClick={() => {
                dispatch({ type: 'SET_COLOR_SCHEME', payload: 'custom' })
                dispatch({ type: 'SELECT_COLOR_SCHEME', payload: scheme.id })
              }}
            >
              <div className="mr-2 h-4 w-4 rounded-full border" style={{ background: scheme.colors.primary }} />
              <span>{scheme.name}</span>
              {state.colorScheme === "custom" && state.selectedColorScheme === scheme.id && (
                <Check className="ml-auto h-4 w-4" />
              )}
              <div className="flex ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4"
                  onClick={(e) => handleEditClick(scheme, e)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch({ type: 'DELETE_CUSTOM_COLOR_SCHEME', payload: scheme.id })
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </DropdownMenuItem>
          ))}
        </>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={(e) => handleCreateNewScheme(e as unknown as React.MouseEvent)}>
        <Palette className="mr-2 h-4 w-4" />
        <span>Create New Scheme</span>
      </DropdownMenuItem>

      <ColorSchemeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editMode={editMode}
        newSchemeName={newSchemeName}
        setNewSchemeName={setNewSchemeName}
        newSchemeColors={newSchemeColors}
        onColorChange={handleColorChange}
        onSave={saveNewColorScheme}
      />
    </>
  )
} 