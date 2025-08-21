import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  Wallet, 
  Settings as SettingsIcon,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData';
import { toast } from 'sonner';

const Settings = () => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    marketUpdates: true,
    priceAlerts: true,
    winnings: true,
    newsletter: false
  });

  if (!wallet.isConnected) {
    navigate('/');
    return null;
  }

  const handleNotificationToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success('Notification preferences updated');
  };

  const handleExportData = () => {
    toast.success('Data export initiated. Check your downloads.');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requires manual verification. Contact support.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={wallet.isConnected ? {
          ...mockUser,
          address: wallet.address || '',
          isConnected: true
        } : undefined}
        onConnectWallet={wallet.connectWallet}
        onDisconnectWallet={wallet.disconnectWallet}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Wallet
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Wallet Address</Label>
                    <Input 
                      id="address"
                      value={wallet.address || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Display Name (Optional)</Label>
                    <Input 
                      id="username"
                      placeholder="Enter display name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Input 
                    id="bio"
                    placeholder="Tell others about your trading strategy"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your trading statistics visible to others
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button className="gradient-bitcoin text-primary-foreground">
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'marketUpdates' && 'Get notified about market resolutions and updates'}
                        {key === 'priceAlerts' && 'Receive alerts when market prices change significantly'}
                        {key === 'winnings' && 'Get notified when you have rewards to claim'}
                        {key === 'newsletter' && 'Receive weekly market analysis and insights'}
                      </p>
                    </div>
                    <Switch 
                      checked={value}
                      onCheckedChange={() => handleNotificationToggle(key as keyof typeof notifications)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">
                      Not Available
                    </Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Management</Label>
                      <p className="text-sm text-muted-foreground">
                        Manage active sessions and devices
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Export</Label>
                      <p className="text-sm text-muted-foreground">
                        Download your trading history and data
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExportData}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-destructive">Delete Account</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Settings */}
          <TabsContent value="wallet">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  Wallet Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Connected Wallet</h3>
                      <p className="text-sm text-muted-foreground">
                        {wallet.address}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                      Connected
                    </Badge>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={wallet.disconnectWallet}
                  >
                    Disconnect Wallet
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve small transactions</Label>
                      <p className="text-sm text-muted-foreground">
                        Skip confirmation for transactions under 0.01 BTC
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Gas price preference</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose transaction speed vs cost preference
                      </p>
                    </div>
                    <Badge variant="outline">
                      Standard
                    </Badge>
                  </div>
                </div>

                <div className="p-4 border border-warning/30 bg-warning/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-warning">Security Notice</p>
                      <p className="text-muted-foreground">
                        Always verify transaction details before signing. ForecastBTC will never ask for your private keys.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;