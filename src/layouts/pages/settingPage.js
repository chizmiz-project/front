import { useState } from "react"
import { UserAccountSection } from "../../components/setting/userAccountSection"
import { SettingsGroup } from "../../components/setting/settingGroup"
import { SettingsItem } from "../../components/setting/settingItem"
import AppLayout from "../AppLayout"
import { useUser } from '../../context/UserContext';

export default function SettingsPage() {
  const { user, logoutUser } = useUser();
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [newPurchase, setNewPurchase] = useState(false)

  return (
    <AppLayout title="تنظیمات">
      <UserAccountSection
        isLoggedIn={!!user}
        userData={user}
        onLogin={() => { }}
        onLogout={logoutUser}
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
    </AppLayout>
  )
}
