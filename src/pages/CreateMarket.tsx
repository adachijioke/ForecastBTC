import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { createMarket } from '@/services/contractService';
import { cn } from '@/lib/utils';

const CreateMarket = () => {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resolutionDate: undefined as Date | undefined,
    minStake: 1,
    maxStake: 1000,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFTs' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.resolutionDate) {
      newErrors.resolutionDate = 'Resolution date is required';
    } else if (formData.resolutionDate <= new Date()) {
      newErrors.resolutionDate = 'Resolution date must be in the future';
    }

    if (formData.minStake < 1) {
      newErrors.minStake = 'Minimum stake must be at least 1 STX';
    }

    if (formData.maxStake < formData.minStake) {
      newErrors.maxStake = 'Maximum stake must be greater than minimum stake';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create a market.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Form Validation Failed",
        description: "Please fix the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await createMarket({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        resolutionDate: formData.resolutionDate!.toISOString(),
        minStake: formData.minStake,
        maxStake: formData.maxStake,
      });

      if (result.success) {
        toast({
          title: "Market Created Successfully",
          description: "Your prediction market has been created and is now live.",
        });
        navigate('/markets');
      } else {
        throw new Error('Failed to create market');
      }
    } catch (error) {
      toast({
        title: "Failed to Create Market",
        description: "There was an error creating your market. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/30 border-b border-border">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Create Prediction Market
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Create a new market for others to predict and stake on outcomes
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {!connected && (
              <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You need to connect your wallet to create a prediction market.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Details</CardTitle>
                      <CardDescription>
                        Provide clear and specific information about your prediction market
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Market Title *</Label>
                        <Input
                          id="title"
                          placeholder="Will Bitcoin reach $100,000 by end of 2024?"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && (
                          <p className="text-sm text-destructive">{errors.title}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formData.title.length}/100 characters
                        </p>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Market Description *</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          placeholder="Detailed description of the market conditions, resolution criteria, and any relevant information..."
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className={errors.description ? 'border-destructive' : ''}
                        />
                        {errors.description && (
                          <p className="text-sm text-destructive">{errors.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formData.description.length}/500 characters
                        </p>
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange('category', value)}
                        >
                          <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-sm text-destructive">{errors.category}</p>
                        )}
                      </div>

                      {/* Resolution Date */}
                      <div className="space-y-2">
                        <Label>Resolution Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.resolutionDate && "text-muted-foreground",
                                errors.resolutionDate && "border-destructive"
                              )}
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
                              disabled={(date) => date <= new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.resolutionDate && (
                          <p className="text-sm text-destructive">{errors.resolutionDate}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Stake Limits</CardTitle>
                      <CardDescription>
                        Set minimum and maximum stake amounts for participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minStake">Minimum Stake (STX) *</Label>
                          <Input
                            id="minStake"
                            type="number"
                            min="1"
                            value={formData.minStake}
                            onChange={(e) => handleInputChange('minStake', parseInt(e.target.value) || 1)}
                            className={errors.minStake ? 'border-destructive' : ''}
                          />
                          {errors.minStake && (
                            <p className="text-sm text-destructive">{errors.minStake}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxStake">Maximum Stake (STX) *</Label>
                          <Input
                            id="maxStake"
                            type="number"
                            min={formData.minStake}
                            value={formData.maxStake}
                            onChange={(e) => handleInputChange('maxStake', parseInt(e.target.value) || 1000)}
                            className={errors.maxStake ? 'border-destructive' : ''}
                          />
                          {errors.maxStake && (
                            <p className="text-sm text-destructive">{errors.maxStake}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview/Summary */}
                <div className="space-y-6">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle>Market Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.category && (
                        <Badge className="bg-accent/10 text-accent border-accent/20">
                          {categories.find(c => c.value === formData.category)?.label}
                        </Badge>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {formData.title || 'Market title will appear here'}
                        </h3>
                      </div>

                      <div className="text-sm text-muted-foreground line-clamp-3">
                        {formData.description || 'Market description will appear here'}
                      </div>

                      {formData.resolutionDate && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Resolves: </span>
                          <span className="text-foreground">
                            {format(formData.resolutionDate, "MMM d, yyyy")}
                          </span>
                        </div>
                      )}

                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Stake:</span>
                          <span>{formData.minStake} STX</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Stake:</span>
                          <span>{formData.maxStake} STX</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Market Creation Fee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">Free</div>
                        <div className="text-xs text-muted-foreground">
                          No upfront cost to create markets
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/markets')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !connected}
                  className="min-w-[120px]"
                >
                  {loading ? 'Creating...' : 'Create Market'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CreateMarket;