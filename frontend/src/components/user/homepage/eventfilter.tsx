 import React, { useState } from 'react';
import { 
  Filter, Calendar, MapPin, Users, Package, 
  Search, ChevronDown, Cake, Music, Hotel, 
  Camera, Utensils, Palette, X, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { EventType, ServiceCategory, FilterOptions } from '@/utils/types';

interface EventFilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const EVENT_TYPES: Array<{value: EventType, label: string, icon: React.ReactNode}> = [
  { value: 'wedding', label: 'Wedding', icon: <Heart className="w-4 h-4" /> },
  { value: 'birthday', label: 'Birthday', icon: <Cake className="w-4 h-4" /> },
  { value: 'outdoor_music_concert', label: 'Outdoor Concert', icon: <Music className="w-4 h-4" /> },
  { value: 'indoor_music_concert', label: 'Indoor Concert', icon: <Music className="w-4 h-4" /> },
  { value: 'corporate', label: 'Corporate', icon: <Package className="w-4 h-4" /> },
  { value: 'funeral', label: 'Funeral', icon: <Heart className="w-4 h-4" /> },
  { value: 'other', label: 'Other', icon: <Calendar className="w-4 h-4" /> },
];

const SERVICE_CATEGORIES: Array<{value: ServiceCategory, label: string, icon: React.ReactNode}> = [
  { value: 'hotel', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
  { value: 'band', label: 'Bands', icon: <Music className="w-4 h-4" /> },
  { value: 'decoration', label: 'Decorations', icon: <Palette className="w-4 h-4" /> },
  { value: 'catering', label: 'Catering', icon: <Utensils className="w-4 h-4" /> },
  { value: 'photography', label: 'Photography', icon: <Camera className="w-4 h-4" /> },
  { value: 'venue', label: 'Venues', icon: <MapPin className="w-4 h-4" /> },
  { value: 'entertainment', label: 'Entertainment', icon: <Music className="w-4 h-4" /> },
  { value: 'saloon', label: 'Saloon', icon: <Palette className="w-4 h-4" /> },
  { value: 'security', label: 'Security', icon: <Users className="w-4 h-4" /> },
  { value: 'other', label: 'Other Services', icon: <Package className="w-4 h-4" /> },
];

const LOCATIONS = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Anuradhapura',
  'Negombo',
  'Trincomalee',
  'Batticaloa',
  'Kurunegala',
  'Ratnapura'
];

const EventFilterSection: React.FC<EventFilterSectionProps> = ({ onFilterChange }) => {
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([5000, 100000]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [crowdRange, setCrowdRange] = useState<[number, number]>([50, 500]);
  const [packageOption, setPackageOption] = useState<boolean | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleEventTypeSelect = (type: EventType) => {
    setSelectedEventType(type === selectedEventType ? null : type);
  };
  
  const handleServiceToggle = (service: ServiceCategory) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
  
  const handleBudgetChange = (value: number[]) => {
    setBudgetRange([value[0], value[1]]);
  };
  
  const handleCrowdChange = (value: number[]) => {
    setCrowdRange([value[0], value[1]]);
  };
  
  const handleClearFilters = () => {
    setSelectedEventType(null);
    setSelectedServices([]);
    setBudgetRange([5000, 100000]);
    setLocation('');
    setDate(null);
    setCrowdRange([50, 500]);
    setPackageOption(null);
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      eventType: selectedEventType,
      serviceCategories: selectedServices,
      budgetRange,
      location,
      date,
      inviteCrowdRange: crowdRange,
      isPackage: packageOption
    });
    
    // On mobile, close the filters panel
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  const formatCurrency = (value: number) => `Rs ${value.toLocaleString()}`;
  
  return (
    <section className="py-6 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile toggle button */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* Filters Container */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          "md:block", // Always visible on desktop
          showFilters ? "block" : "hidden" // Toggle on mobile
        )}>
          <div className="glass-card rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center">
                <Filter className="w-5 h-5 mr-2 text-primary" />
                Find Your Perfect Event Services
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={handleClearFilters}
              >
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Event Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Event Type</Label>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map(({ value, label, icon }) => (
                    <Badge
                      key={value}
                      variant={selectedEventType === value ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer hover:bg-primary/20 transition-colors duration-200",
                        selectedEventType === value ? "bg-primary text-primary-foreground" : ""
                      )}
                      onClick={() => handleEventTypeSelect(value)}
                    >
                      {icon}
                      <span className="ml-1">{label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Services */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Services</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        {selectedServices.length === 0 
                          ? "Select Services" 
                          : `${selectedServices.length} selected`}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-w-[300px] max-h-[300px] overflow-y-auto p-0">
                    <div className="p-4 space-y-3">
                      {SERVICE_CATEGORIES.map(({ value, label, icon }) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`service-${value}`} 
                            checked={selectedServices.includes(value)}
                            onCheckedChange={() => handleServiceToggle(value)}
                          />
                          <Label 
                            htmlFor={`service-${value}`}
                            className="flex items-center cursor-pointer text-sm font-normal"
                          >
                            {icon}
                            <span className="ml-2">{label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {selectedServices.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedServices.slice(0, 3).map(service => {
                      const serviceObj = SERVICE_CATEGORIES.find(s => s.value === service);
                      return (
                        <Badge 
                          key={service} 
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          {serviceObj?.icon}
                          <span>{serviceObj?.label}</span>
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => handleServiceToggle(service)}
                          />
                        </Badge>
                      );
                    })}
                    {selectedServices.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{selectedServices.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* Budget Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Budget Range</Label>
                <div className="px-2">
                  <Slider
                    defaultValue={[budgetRange[0], budgetRange[1]]}
                    max={500000}
                    min={1000}
                    step={1000}
                    onValueChange={handleBudgetChange}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-foreground/70">
                  <span>{formatCurrency(budgetRange[0])}</span>
                  <span>{formatCurrency(budgetRange[1])}</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Location</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location || "Select Location"}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-w-[300px] max-h-[300px] overflow-y-auto p-0">
                    <div className="p-4 space-y-2">
                      <Input 
                        placeholder="Search locations..." 
                        className="mb-2"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      {LOCATIONS.filter(loc => 
                        loc.toLowerCase().includes(location.toLowerCase()) || !location
                      ).map(loc => (
                        <div 
                          key={loc}
                          className="px-2 py-1.5 hover:bg-primary/10 rounded-md cursor-pointer transition-colors"
                          onClick={() => setLocation(loc)}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Date */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Event Date</Label>
                <Input 
                  type="date"
                  className="w-full"
                  onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
              
              {/* Crowd Size */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Crowd Size</Label>
                <div className="px-2">
                  <Slider
                    defaultValue={[crowdRange[0], crowdRange[1]]}
                    max={1000}
                    min={10}
                    step={10}
                    onValueChange={handleCrowdChange}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-foreground/70">
                  <span>{crowdRange[0]} people</span>
                  <span>{crowdRange[1]} people</span>
                </div>
              </div>
              
              {/* Package Option */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Package Option</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant={packageOption === true ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setPackageOption(true)}
                  >
                    Package
                  </Button>
                  <Button
                    variant={packageOption === false ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setPackageOption(false)}
                  >
                    Non-Package
                  </Button>
                  <Button
                    variant={packageOption === null ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setPackageOption(null)}
                  >
                    Any
                  </Button>
                </div>
              </div>
              
              {/* Apply Button (Full Width for Mobile) */}
              <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                <Button 
                  className="w-full md:w-auto"
                  onClick={handleApplyFilters}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventFilterSection;
