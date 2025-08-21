import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Plus, 
  Info,
  DollarSign,
  Target
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData';
import { MarketCategory } from '@/types/market';
import { toast } from 'sonner';
import { format } from 'date-fns';

const CreateMarket = () => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resolutionCriteria: '',
    resolutionDate: undefined as Date | undefined,
    initialLiquidity: '',
    tags: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState('');

  if (!wallet.isConnected) {
    navigate('/');
    return null;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || 
        !formData.resolutionCriteria || !formData.resolutionDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate market creation
    toast.success('Market creation initiated!', {
      description: 'Your market will be live once the smart contract is deployed.'
    });
    
    // Redirect to markets page
    setTimeout(() => {
      navigate('/markets');
    }, 2000);
  };

  const categories = Object.values(MarketCategory);

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
          <Button 
            variant="outline" 
            onClick={() => navigate('/markets')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Markets
          </Button>
          <h1 className="text-3xl font-bold mb-2">Create Prediction Market</h1>
          <p className="text-muted-foreground">
            Create a new market for others to predict outcomes and trade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Market Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Market Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Will Bitcoin reach $100,000 by end of 2024?"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be specific and clear. This is what traders will see first.
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed context about what this market is predicting..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select market category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resolution Criteria */}
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolution Criteria *</Label>
                    <Textarea
                      id="resolution"
                      placeholder="Clearly define how and when this market will be resolved. Include specific data sources..."
                      value={formData.resolutionCriteria}
                      onChange={(e) => handleInputChange('resolutionCriteria', e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Be extremely specific to avoid disputes. Include exact data sources and conditions.
                    </p>
                  </div>

                  {/* Resolution Date */}
                  <div className="space-y-2">
                    <Label>Resolution Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.resolutionDate ? (
                            format(formData.resolutionDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.resolutionDate}
                          onSelect={(date) => handleInputChange('resolutionDate', date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Initial Liquidity */}
                  <div className="space-y-2">
                    <Label htmlFor="liquidity">Initial Liquidity (BTC)</Label>
                    <Input
                      id="liquidity"
                      type="number"
                      step="0.001"
                      placeholder="0.1"
                      value={formData.initialLiquidity}
                      onChange={(e) => handleInputChange('initialLiquidity', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Provide initial liquidity to help price discovery. Minimum 0.01 BTC recommended.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
                  >
                    Create Market
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Preview & Info */}
          <div className="space-y-6">
            {/* Market Preview */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.title ? (
                  <div>
                    <h3 className="font-semibold line-clamp-2">{formData.title}</h3>
                    {formData.category && (
                      <Badge variant="outline" className="mt-2">
                        {formData.category}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Your market title will appear here
                  </p>
                )}

                {formData.resolutionDate && (
                  <div className="text-sm text-muted-foreground">
                    Resolves: {format(formData.resolutionDate, "PPP")}
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Creation Info */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-primary" />
                  Market Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Creation Fee</h4>
                  <p className="text-muted-foreground">
                    0.001 BTC fee for deploying smart contract
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Moderation</h4>
                  <p className="text-muted-foreground">
                    Markets undergo review for quality and compliance
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Resolution</h4>
                  <p className="text-muted-foreground">
                    Outcomes are resolved using specified criteria and oracles
                  </p>
                </div>

                <div className="p-3 border border-warning/30 bg-warning/10 rounded">
                  <p className="text-xs text-warning">
                    Markets cannot be edited once created. Double-check all details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarket;