import { useState } from "react"
import { Box } from '@mui/material'
import { UserAccountSection } from "../components/setting/userAccountSection"
import { SettingsGroup } from "../components/setting/settingGroup"
import { SettingsItem } from "../components/setting/settingItem"
import { AppBar } from "../components/AppBar"

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [newPurchase, setNewPurchase] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar variant="simple" title="تنظیمات" />
        
        <UserAccountSection
          isLoggedIn={isLoggedIn}
          userData={{
            name: "سجاد سلطانیان",
            phone: "۹۸۵ ۷۷۲ ۷۸۲۷"
          }}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        <SettingsGroup title="آگهی‌ها">
          <SettingsItem
            type="navigation"
            label="آگهی‌های ذخیره‌شده"
            to="/saved-ads"
          />
          <SettingsItem
            type="navigation"
            label="آگهی‌های من"
            to="/my-ads"
          />
          <SettingsItem
            type="navigation"
            label="بازدیدهای اخیر"
            to="/recent-views"
          />
        </SettingsGroup>
        <SettingsGroup title="خیلی بیشتر">
          <SettingsItem
            type="switch"
            label="حالت شب"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <SettingsItem
            type="checkbox"
            label="ری‌اکشن دادن"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          <SettingsItem
            type="switch"
            label="خریدار جدید"
            checked={newPurchase}
            onCheckedChange={setNewPurchase}
          />
        </SettingsGroup>
      </Box>
  )
}

