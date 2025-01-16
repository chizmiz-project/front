import { useState } from "react"
import { UserAccountSection } from "../../components/list/UserAccountSection"
import { CustomListGroup } from "../../components/list/CutomListGroup"
import { CutomListItem } from "../../components/list/CutomListItem"
import AppLayout from "../AppLayout"
import { useUser } from '../../context/UserContext';
import { Box } from "@mui/material"
import { useTheme } from "../../context/ThemeContext"

export default function SettingsPage() {
  const { user, logoutUser } = useUser();
  const { mode, toggleTheme } = useTheme();

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
          to="/favorite-ads"
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
          checked={mode === 'dark'}
          onCheckedChange={toggleTheme}
        />
        ]
      }/>
      </Box>
    </AppLayout>
  )
}
