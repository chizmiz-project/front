import { useState } from "react"
import { UserAccountSection } from "../../components/setting/userAccountSection"
import { CustomListGroup } from "../../components/setting/settingGroup"
import { CutomListItem } from "../../components/setting/settingItem"
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

      <CustomListGroup>
        <CutomListItem
          type="navigation"
          label="آگهی‌های ذخیره‌شده"
          to="/saved-ads"
        />
        <CutomListItem
          type="navigation"
          label="آگهی‌های من"
          to="/my-ads"
        />
        <CutomListItem
          type="navigation"
          label="بازدیدهای اخیر"
          to="/recent-views"
        />
      </CustomListGroup>

      <CustomListGroup children={
        [
          <CutomListItem
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
