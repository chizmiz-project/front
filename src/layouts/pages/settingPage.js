import { useState, useEffect } from "react"
import { UserAccountSection } from "../../components/setting/userAccountSection"
import { SettingsGroup } from "../../components/setting/settingGroup"
import { SettingsItem } from "../../components/setting/settingItem"
import AppLayout from "../AppLayout"
import ApiService from '../../services/api'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [newPurchase, setNewPurchase] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiService.get('/account/me/')
        if (response?.data) {
          setUser(response.data)
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setIsLoggedIn(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <AppLayout title="تنظیمات">
      <UserAccountSection
        isLoggedIn={isLoggedIn}
        userData={user}
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
    </AppLayout>
  )
}
