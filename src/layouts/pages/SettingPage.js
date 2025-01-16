import { UserAccountSection } from "../../components/list/UserAccountSection"
import { CustomListGroup } from "../../components/list/CutomListGroup"
import { CutomListItem } from "../../components/list/CutomListItem"
import AppLayout from "../AppLayout"
import { useUser } from '../../context/UserContext';
import { Box } from "@mui/material"
import { useCustomTheme } from "../../context/ThemeContext"

export default function SettingsPage() {
  const { user, logoutUser } = useUser();
  const { mode, toggleTheme } = useCustomTheme();

  return (
    <AppLayout title="تنظیمات">
      <Box display={'flex'} flexDirection={'column'} gap={2}>
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

      <CustomListGroup>
      <CutomListItem
          type="switch"
          label="حالت شب"
          checked={mode === 'dark'}
          onCheckedChange={toggleTheme}
        />
      </CustomListGroup>
      </Box>
    </AppLayout>
  )
}
