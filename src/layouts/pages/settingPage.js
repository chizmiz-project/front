import { useState } from "react"
import { UserAccountSection } from "../../components/setting/userAccountSection"
import { SettingsGroup } from "../../components/setting/settingGroup"
import { SettingsItem } from "../../components/setting/settingItem"
import AppLayout from "../AppLayout"
import { useUser } from '../../context/UserContext';
import { Box } from "@mui/material"

export default function SettingsPage() {
  const { user, logoutUser } = useUser();
  const [darkMode, setDarkMode] = useState(false)

  return (
    <AppLayout title="تنظیمات">
      <Box>
      <UserAccountSection
        isLoggedIn={!!user}
        userData={user}
        onLogin={() => { }}
        onLogout={logoutUser}
      />

      <SettingsGroup>
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

      <SettingsGroup children={
        [
          <SettingsItem
          type="switch"
          label="حالت شب"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        ]
      }/>
      </Box>
    </AppLayout>
  )
}
