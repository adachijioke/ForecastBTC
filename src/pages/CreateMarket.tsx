import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CreateMarket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: undefined as Date | undefined,
    outcomes: ['', '']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addOutcome = () => {
    setFormData(prev => ({
      ...prev,
      outcomes: [...prev.outcomes, '']
    }));
  };

  const removeOutcome = (index: number) => {
    if (formData.outcomes.length > 2) {
      setFormData(prev => ({
        ...prev,
        outcomes: prev.outcomes.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOutcome = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      outcomes: prev.outcomes.map((outcome, i) => i === index ? value : outcome)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Market title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    const validOutcomes = formData.outcomes.filter(o => o.trim());
    if (validOutcomes.length < 2) {
      newErrors.outcomes = 'At least 2 outcomes are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      outcomes: formData.outcomes.filter(o => o.trim())
    };

    console.log('Form Data:', submitData);
    alert('Market data logged to console!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Create Market
            </h1>
            <p className="text-muted-foreground">
              Set up a new prediction market for others to participate in
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
              <CardDescription>
                Fill out the form below to create your prediction market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Market Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Market Title *</Label>
                  <Input
                    id="title"
                    placeholder="Will Bitcoin reach $100,000 by end of 2024?"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe the market conditions and resolution criteria..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label>Market Deadline *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.deadline && "text-muted-foreground",
                          errors.deadline && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deadline ? (
                          format(formData.deadline, "PPP")
                        ) : (
                          <span>Pick a deadline</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.deadline && (
                    <p className="text-sm text-destructive">{errors.deadline}</p>
                  )}
                </div>

                {/* Outcomes */}
                <div className="space-y-2">
                  <Label>Possible Outcomes *</Label>
                  <div className="space-y-3">
                    {formData.outcomes.map((outcome, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Outcome ${index + 1}`}
                          value={outcome}
                          onChange={(e) => updateOutcome(index, e.target.value)}
                        />
                        {formData.outcomes.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeOutcome(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addOutcome}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Outcome
                    </Button>
                  </div>
                  {errors.outcomes && (
                    <p className="text-sm text-destructive">{errors.outcomes}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Market
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateMarket;