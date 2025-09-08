import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const countries = [
    'Deutschland',
    'Österreich',
    'Schweiz',
    'Andere'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      toast({
        title: "Nachricht gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei dir.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+49 (0) 123 456789',
      action: 'tel:+491234567890'
    },
    {
      icon: Mail,
      title: 'E-Mail',
      content: 'info@nf-coaching.de',
      action: 'mailto:info@nf-coaching.de'
    },
    {
      icon: MapPin,
      title: 'Standort',
      content: 'Online Coaching\nweltweit verfügbar',
      action: null
    }
  ];

  return (
    <section id="kontakt" className="py-20 bg-nf-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-nf-black mb-6">
            Starte deine <span className="text-nf-red">Transformation</span>
          </h2>
          <p className="text-xl text-nf-gray-600 max-w-3xl mx-auto text-balance">
            Lass uns in einem kostenlosen Gespräch herausfinden, wie wir dir helfen können
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-nf-black mb-6">
                Kontaktiere uns direkt
              </h3>
              <p className="text-nf-gray-600 mb-8 text-lg leading-relaxed">
                Bereit für deine Transformation? Wir sind hier, um dir zu helfen. 
                Kontaktiere uns für ein kostenloses Beratungsgespräch und lass uns 
                gemeinsam deinen Weg zu einem gesünderen, stärkeren Ich planen.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-nf-red/10 p-3 rounded-lg group-hover:bg-nf-red/20 transition-smooth">
                    <info.icon className="h-6 w-6 text-nf-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-nf-black mb-1">{info.title}</h4>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-nf-gray-600 hover:text-nf-red transition-smooth whitespace-pre-line"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-nf-gray-600 whitespace-pre-line">{info.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="border-0 bg-gradient-to-br from-nf-black to-nf-red/10 shadow-medium">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-nf-white mb-3">
                  Kostenloses Erstgespräch
                </h4>
                <p className="text-nf-white/80 mb-4">
                  30 Minuten persönliche Beratung - völlig unverbindlich
                </p>
                <ul className="text-nf-white/70 space-y-1 text-sm">
                  <li>✓ Analyse deiner aktuellen Situation</li>
                  <li>✓ Individuelle Zieldefinition</li>
                  <li>✓ Erste Empfehlungen</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-large">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-nf-black">
                  Jetzt Kontakt aufnehmen
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="border-nf-gray-200 focus:border-nf-red focus:ring-nf-red"
                        placeholder="Dein vollständiger Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-nf-gray-200 focus:border-nf-red focus:ring-nf-red"
                        placeholder="deine@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-nf-gray-200 focus:border-nf-red focus:ring-nf-red"
                        placeholder="+49 123 456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Land</Label>
                      <Select onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className="border-nf-gray-200 focus:border-nf-red focus:ring-nf-red">
                          <SelectValue placeholder="Land auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-nf-gray-200 focus:border-nf-red focus:ring-nf-red min-h-[120px]"
                      placeholder="Erzähle uns von deinen Zielen und wie wir dir helfen können..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-nf-red hover:bg-nf-red/90 text-nf-white py-3 text-lg font-semibold shadow-red-glow transition-smooth"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-nf-white mr-2"></div>
                        Wird gesendet...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        Nachricht senden
                      </div>
                    )}
                  </Button>

                  <p className="text-sm text-nf-gray-600 text-center">
                    * Pflichtfelder. Wir melden uns innerhalb von 24 Stunden bei dir.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;