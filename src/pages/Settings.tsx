import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useWallet } from '@/hooks/useWallet';

const Settings = () => {
  const { connected, address } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/30 border-b border-border">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Settings
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Manage your account preferences and app settings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Content */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your profile information and display preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          placeholder="Enter username"
                          disabled={!connected}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          disabled={!connected}
                        />
                      </div>
                    </div>

                    {connected && (
                      <div className="space-y-2">
                        <Label>Connected Wallet</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="font-mono text-sm">{address}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button disabled={!connected}>Save Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Market Resolutions</Label>
                          <div className="text-sm text-muted-foreground">
                            Get notified when markets you've staked on resolve
                          </div>
                        </div>
                        <Switch disabled={!connected} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Markets</Label>
                          <div className="text-sm text-muted-foreground">
                            Notifications for new markets in your favorite categories
                          </div>
                        </div>
                        <Switch disabled={!connected} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Price Alerts</Label>
                          <div className="text-sm text-muted-foreground">
                            Alert when market prices reach your target levels
                          </div>
                        </div>
                        <Switch disabled={!connected} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Summary</Label>
                          <div className="text-sm text-muted-foreground">
                            Weekly email with your performance summary
                          </div>
                        </div>
                        <Switch disabled={!connected} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and wallet connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">Wallet Connection</div>
                          <div className="text-sm text-muted-foreground">
                            {connected ? 'Wallet connected and secure' : 'No wallet connected'}
                          </div>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Transaction Confirmations</Label>
                          <div className="text-sm text-muted-foreground">
                            Require confirmation for all transactions
                          </div>
                        </div>
                        <Switch defaultChecked disabled={!connected} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-disconnect</Label>
                          <div className="text-sm text-muted-foreground">
                            Automatically disconnect after 24 hours of inactivity
                          </div>
                        </div>
                        <Switch disabled={!connected} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button variant="destructive" disabled={!connected}>
                        Disconnect All Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Display Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your ForecastBTC experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select defaultValue="dark">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Dark (Default)</SelectItem>
                            <SelectItem value="light" disabled>Light (Coming Soon)</SelectItem>
                            <SelectItem value="auto" disabled>Auto (Coming Soon)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Currency Display</Label>
                        <Select defaultValue="stx">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stx">STX</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="btc">BTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Default Market View</Label>
                        <Select defaultValue="grid">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">Grid View</SelectItem>
                            <SelectItem value="list">List View</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compact Mode</Label>
                          <div className="text-sm text-muted-foreground">
                            Show more information in less space
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Animations</Label>
                          <div className="text-sm text-muted-foreground">
                            Enable smooth transitions and animations
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Regional Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es" disabled>Español (Coming Soon)</SelectItem>
                            <SelectItem value="zh" disabled>中文 (Coming Soon)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time</SelectItem>
                            <SelectItem value="pst">Pacific Time</SelectItem>
                            <SelectItem value="cet">Central European Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-6">
                  <Button>Save Preferences</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;