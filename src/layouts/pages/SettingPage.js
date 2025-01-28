import { UserAccountSection } from "../../components/list/UserAccountSection"
import { CustomListGroup } from "../../components/list/CutomListGroup"
import { CutomListItem } from "../../components/list/CutomListItem"
import AppLayout from "../AppLayout"
import { useUser } from '../../context/UserContext';
import { Box } from "@mui/material"
import { useCustomTheme } from "../../context/ThemeContext"
import { StyledIconWrapper } from "../../components/StyledIconWrapper";
import { Bedtime, Bookmark, Folder, WatchLater } from "@mui/icons-material";

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
          icon={
            <StyledIconWrapper backgroundColor="#02ccfe">
            <Bookmark />
        </StyledIconWrapper>
          }
        />
        <CutomListItem
          type="navigation"
          label="آگهی‌های من"
          to="/my-ads"
          icon={
            <StyledIconWrapper backgroundColor="#FF2D55">
            <Folder />
        </StyledIconWrapper>
          }
        />
        <CutomListItem
          type="navigation"
          label="بازدیدهای اخیر"
          to="/recent-views"
          icon={
            <StyledIconWrapper backgroundColor="#95a5a6">
            <WatchLater/>
        </StyledIconWrapper>
          }
        />
      </CustomListGroup>

      <CustomListGroup>
      <CutomListItem
          type="switch"
          label="حالت شب"
          checked={mode === 'dark'}
          onCheckedChange={toggleTheme}
          icon={
            <StyledIconWrapper backgroundColor="#5856D6">
            <Bedtime />
        </StyledIconWrapper>
          }
        />
      </CustomListGroup>
      </Box>
    </AppLayout>
  )
}
