
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eventhub-purple to-eventhub-accent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/services">Services</NavLink>
            <div className="relative group">
              <NavLink href="#" className="flex items-center">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </NavLink>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                <div className="py-1">
                  <DropdownItem href="/categories/wedding">Wedding</DropdownItem>
                  <DropdownItem href="/categories/concerts">Concerts</DropdownItem>
                  <DropdownItem href="/categories/birthday">Birthday</DropdownItem>
                  <DropdownItem href="/categories/corporate">Corporate</DropdownItem>
                  <DropdownItem href="/categories/funeral">Funeral</DropdownItem>
                </div>
              </div>
            </div>
            <NavLink href="/about">About</NavLink>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" className="animate-hover">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-eventhub-accent hover:bg-eventhub-accent/90 animate-hover">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eventhub-purple to-eventhub-accent">
              EventHub
            </span>
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={toggleMobileMenu}>Home</MobileNavLink>
            <MobileNavLink href="/events" onClick={toggleMobileMenu}>Events</MobileNavLink>
            <MobileNavLink href="/services" onClick={toggleMobileMenu}>Services</MobileNavLink>
            <MobileNavLink href="/categories" onClick={toggleMobileMenu}>Categories</MobileNavLink>
            <MobileNavLink href="/about" onClick={toggleMobileMenu}>About</MobileNavLink>
          </nav>
          
          <div className="mt-auto space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/login" onClick={toggleMobileMenu}>Log In</Link>
            </Button>
            <Button asChild className="w-full bg-eventhub-accent">
              <Link to="/signup" onClick={toggleMobileMenu}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop Navigation Link
const NavLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link 
    to={href} 
    className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-eventhub-accent hover:bg-gray-50/50 transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
);

// Mobile Navigation Link
const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link 
    to={href} 
    className="py-2 text-lg font-medium text-gray-700 hover:text-eventhub-accent transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
);

// Dropdown Item
const DropdownItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    to={href} 
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eventhub-accent transition-colors duration-150"
  >
    {children}
  </Link>
);

export default Navbar;