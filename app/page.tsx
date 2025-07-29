"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Scale,
  Briefcase,
  FileText,
  Users,
  Handshake,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [visibleSection, setVisibleSection] = useState("inicio")
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Find which section is currently visible
      const sections = ["inicio", "servicos", "sobre", "equipe", "depoimentos", "contato"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setVisibleSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect for hero section
  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`
      }
    }

    window.addEventListener("scroll", handleParallax)
    return () => window.removeEventListener("scroll", handleParallax)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const testimonials = [
    {
      id: 0,
      text: "O escritório Almeida e Araujo foi fundamental na resolução do meu caso. Profissionais extremamente competentes e atenciosos. Recomendo a todos que precisam de assistência jurídica.",
      name: "Carlos Mendes",
      position: "Empresário",
      image: "/images/client-1.png",
    },
    {
      id: 1,
      text: "Excelente atendimento e profissionalismo. A Dr. Araujo conduziu meu processo trabalhista com muita competência e conseguimos um resultado muito positivo. Muito grata!",
      name: "Ana Paula Santos",
      position: "Gerente Comercial",
      image: "/images/client-2.png",
    },
    {
      id: 2,
      text: "O Dr. Almeida me auxiliou em uma questão imobiliária complexa com muita dedicação. Sua orientação foi fundamental para que eu tomasse as decisões corretas. Recomendo fortemente.",
      name: "Roberto Oliveira",
      position: "Engenheiro",
      image: "/images/client-3.png",
    },
  ]

  const services = [
    {
      icon: <Briefcase className="h-10 w-10 mb-4 text-primary" />,
      title: "Direito Civil",
      description:
        "Contratos, responsabilidade civil, direito imobiliário, direito do consumidor e questões familiares.",
      image: "/images/direito-civil.png",
    },
    {
      icon: <FileText className="h-10 w-10 mb-4 text-primary" />,
      title: "Direito Trabalhista",
      description: "Defesa em reclamações trabalhistas, consultoria preventiva e assessoria em negociações coletivas.",
      image: "/images/direito-trabalhista.png",
    },
    {
      icon: <Building2 className="h-10 w-10 mb-4 text-primary" />,
      title: "Direito Empresarial",
      description: "Constituição de empresas, contratos comerciais, fusões e aquisições, e recuperação judicial.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: <Users className="h-10 w-10 mb-4 text-primary" />,
      title: "Direito de Família",
      description: "Divórcio, pensão alimentícia, guarda de filhos, inventários e testamentos.",
      image: "/images/direito-familia.png",
    },
    {
      icon: <Handshake className="h-10 w-10 mb-4 text-primary" />,
      title: "Mediação e Arbitragem",
      description: "Soluções alternativas de conflitos, mediação e arbitragem para resolução eficiente de disputas.",
      image: "/images/mediacao-arbitragem.png",
    },
    {
      icon: <MessageSquare className="h-10 w-10 mb-4 text-primary" />,
      title: "Consultoria Jurídica",
      description: "Assessoria jurídica preventiva para pessoas físicas e jurídicas, evitando litígios futuros.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: <FileText className="h-10 w-10 mb-4 text-primary" />,
      title: "Registro de Marcas e Patentes",
      description:
        "Assessoria completa para registro e proteção de marcas, patentes e propriedade intelectual para empresas e empreendedores.",
      image: "/images/registro-marcas-patentes.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`fixed top-0 z-40 w-full border-b backdrop-blur transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 supports-[backdrop-filter]:bg-background/60"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Scale className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.span
              className="text-xl font-bold"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Araujo
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {["inicio", "servicos", "sobre", "equipe", "depoimentos", "contato"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item)
                  }}
                  className={`transition-colors hover:text-primary relative ${
                    visibleSection === item ? "text-primary font-medium" : "text-foreground/80"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {visibleSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeSection"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild className="hidden md:flex" variant="default" size="sm">
              <Link
                href="#contato"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contato")
                }}
                className="group"
              >
                Agende uma Consulta
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <nav className="container py-4 flex flex-col space-y-4">
                {["inicio", "servicos", "sobre", "equipe", "depoimentos", "contato"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item)
                    }}
                    className={`transition-colors hover:text-primary py-2 ${
                      visibleSection === item ? "text-primary font-medium" : "text-foreground/80"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                ))}
                <Button asChild className="mt-2" variant="default" size="sm">
                  <Link
                    href="#contato"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contato")
                    }}
                  >
                    Agende uma Consulta
                  </Link>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen max-h-[800px] overflow-hidden pt-16">
          {/* Parallax background */}
          <div className="absolute inset-0 z-0" ref={heroRef}>
            <Image
              src="/images/hero-background.png"
              alt="Almeida e Araujo Advocacia"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Content */}
          <div className="container relative z-20 flex h-full flex-col items-start justify-center gap-4 text-white px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto lg:mx-0 pt-20 sm:pt-16 md:pt-12 lg:pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-primary/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6"
              >
                <span className="text-xs sm:text-sm font-medium">Excelência Jurídica desde 2005</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="block">Araujo</span>
                <span className="block mt-1 sm:mt-2">
                  <span className="text-primary">Advocacia</span> Especializada
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[90%] sm:max-w-[80%] lg:max-w-[600px] text-base sm:text-lg md:text-xl text-white/90 mt-4 sm:mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Defendendo seus direitos com dedicação e profissionalismo. Soluções jurídicas personalizadas para cada
                cliente.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
                  onClick={() => scrollToSection("contato")}
                >
                  <span>Agende uma Consulta</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:text-white hover:bg-white/10 group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
                  onClick={() => scrollToSection("servicos")}
                >
                  <span>Nossos Serviços</span>
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-12 sm:mt-16 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg p-3 sm:p-4">
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-primary mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    18+
                  </motion.div>
                  <div className="text-xs sm:text-sm text-white/80">Anos de Experiência</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg p-3 sm:p-4">
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-primary mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    500+
                  </motion.div>
                  <div className="text-xs sm:text-sm text-white/80">Casos Resolvidos</div>
                </div>
                
                {/*
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg p-3 sm:p-4">
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-primary mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    12
                  </motion.div>
                  <div className="text-xs sm:text-sm text-white/80">Advogados Especialistas</div>
                </div>
                */}

                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg p-3 sm:p-4">
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-primary mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    98%
                  </motion.div>
                  <div className="text-xs sm:text-sm text-white/80">Clientes Satisfeitos</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 0.5,
            }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-20 bg-muted/30">
          <div className="container">
            <motion.div
              className="flex flex-col items-center text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Nossos Serviços</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Soluções Jurídicas Especializadas</h2>
              <p className="max-w-[800px] text-muted-foreground">
                Oferecemos soluções jurídicas personalizadas para atender às suas necessidades específicas, com foco em
                resultados e excelência no atendimento.
              </p>
            </motion.div>

            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="cards">Serviços</TabsTrigger>
                <TabsTrigger value="grid">Áreas de Atuação</TabsTrigger>
              </TabsList>

              <TabsContent value="cards" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="h-48 relative overflow-hidden">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        </div>
                        <CardContent className="p-6 pt-5">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          <Link
                            href="#contato"
                            onClick={(e) => {
                              e.preventDefault()
                              scrollToSection("contato")
                            }}
                            className="group inline-flex items-center text-sm font-medium text-primary"
                          >
                            Saiba mais
                            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Direito Civil",
                    "Direito Trabalhista",
                    "Direito Empresarial",
                    "Direito de Família",
                    "Direito Imobiliário",
                    "Direito do Consumidor",
                    "Direito Tributário",
                    "Direito Previdenciário",
                    "Mediação e Arbitragem",
                    "Direito Contratual",
                    "Recuperação Judicial",
                    "Consultoria Preventiva",
                  ].map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{area}</h3>
                            <Link
                              href="#contato"
                              onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("contato")
                              }}
                              className="text-sm text-primary hover:underline"
                            >
                              Consulte um especialista
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button size="lg" onClick={() => scrollToSection("contato")} className="group">
                Agende uma Consulta Especializada
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* WhatsApp CTA Section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-green-100 dark:bg-green-900/30 px-4 py-1 rounded-full mb-4">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Atendimento Imediato</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Precisa de Orientação Jurídica Urgente?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Entre em contato conosco pelo WhatsApp e receba atendimento personalizado. Nossa equipe está pronta para
                esclarecer suas dúvidas e oferecer a melhor solução jurídica para o seu caso.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="https://wa.me/5521981565120?text=Olá! Gostaria de agendar uma consulta jurídica."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Falar no WhatsApp
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Resposta em até 30 minutos</span>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Consulta Gratuita</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Atendimento 24h</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Resposta Rápida</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                  <span className="text-sm font-medium text-primary">Sobre Nós</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Tradição e Excelência em Advocacia
                </h2>
                <p className="text-muted-foreground mb-4">
                  Fundado pelos advogados Almeida e Araujo, nosso escritório tem se destacado no cenário jurídico
                  brasileiro por sua excelência e compromisso com os clientes há mais de 18 anos.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nosso escritório deu início com o Dr. Júlio Cesar de Almeida, advogado muito renomado e conhecido no
                  bairro Imperial de Santa Cruz, sendo dada a continuidade por seu filho Dr. Vinicius Serra de Almeida,
                  assim como pelo Dr. Carlos Eduardo Candido de Araujo, abrindo assim possibilidades de consultoria e
                  assessoria jurídica a pessoas físicas e jurídicas da Região.
                </p>
                <p className="text-muted-foreground mb-6">
                  Nossa missão é defender os interesses de nossos clientes com ética, dedicação e profissionalismo,
                  buscando sempre os melhores resultados e construindo relacionamentos duradouros.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    {
                      icon: <Scale className="h-5 w-5 text-primary" />,
                      title: "Ética",
                      subtitle: "Compromisso com a integridade",
                    },
                    {
                      icon: <Users className="h-5 w-5 text-primary" />,
                      title: "Experiência",
                      subtitle: "Equipe especializada",
                    },
                    {
                      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
                      title: "Excelência",
                      subtitle: "Resultados comprovados",
                    },
                    {
                      icon: <Handshake className="h-5 w-5 text-primary" />,
                      title: "Dedicação",
                      subtitle: "Atendimento personalizado",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  <Button onClick={() => scrollToSection("equipe")} className="group">
                    Conheça Nossa Equipe
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/esc-almeida.jpg"
                    alt="Escritório Almeida e Araujo Advocacia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2">Nosso Compromisso</h3>
                      <p className="text-muted-foreground">
                        "Buscamos não apenas resolver problemas jurídicos, mas construir relacionamentos de confiança
                        com nossos clientes."
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 overflow-hidden">
                          <Image
                            src="/images/dr-almeida-founder.png"
                            alt="Dr. Araujo"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Dr. Araujo</h4>
                          <p className="text-sm text-primary">Sócio Fundador</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="equipe" className="py-20 bg-muted/30">
          <div className="container">
            <motion.div
              className="flex flex-col items-center text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Nossa Equipe</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Profissionais Especializados</h2>
              <p className="max-w-[800px] text-muted-foreground">
                Conheça os profissionais dedicados que compõem nossa equipe, prontos para oferecer o melhor atendimento
                e as soluções jurídicas mais adequadas para o seu caso.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Vinicius Serra de Almeida",
                  position: "Sócio",
                  description:
                    "Advogado pós-graduado em Direito Constitucional, com vasta experiência profissional em escritórios de grande porte, desde 2011 nas áreas cível, trabalhista e família.",
                  image: "/images/lawyer-male-1.png",
                  specialties: ["Direito Civil", "Direito Trabalhista", "Direito de Família"],
                },
                {
                  name: "Dr. Carlos Eduardo Candido de Araujo",
                  position: "Sócio",
                  description:
                    "Advogado pós-graduado em Direito Empresarial, com experiência profissional desde 2016 em gestão jurídica de empresas voltadas ao ramo de operadora de planos de saúde e estabelecimentos médicos.",
                  image: "/images/lawyer-male-2.png",
                  specialties: ["Direito Empresarial", "Legalização de Empresas", "Consultoria Jurídica"],
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="h-[300px] relative overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                    <CardContent className="p-6 relative">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary mb-3">{member.position}</p>
                      <p className="text-muted-foreground mb-4">{member.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => scrollToSection("contato")}>
                          Contato
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button variant="outline" size="lg" onClick={() => scrollToSection("contato")} className="group">
                Entre em Contato com Nossa Equipe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section 
        <section id="depoimentos" className="py-20">
          <div className="container">
            <motion.div
              className="flex flex-col items-center text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Depoimentos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">O Que Nossos Clientes Dizem</h2>
              <p className="max-w-[800px] text-muted-foreground">
                Veja o que nossos clientes dizem sobre nossos serviços e como temos ajudado a resolver seus problemas
                jurídicos com eficiência e dedicação.
              </p>
            </motion.div>

            <div className="relative overflow-hidden">
              <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                  {testimonials.map(
                    (testimonial, index) =>
                      activeTestimonial === index && (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                          className="bg-card rounded-lg p-8 shadow-lg"
                        >
                          <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ))}
                            </div>
                          </div>

                          <blockquote className="text-xl text-muted-foreground mb-6 italic relative">
                            <svg
                              className="absolute -top-6 -left-6 h-12 w-12 text-primary/10"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            "{testimonial.text}"
                          </blockquote>

                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full overflow-hidden">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                width={56}
                                height={56}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-lg">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                            </div>
                          </div>
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>

              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      activeTestimonial === index ? "bg-primary" : "bg-primary/20"
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>

              
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md pointer-events-auto"
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md pointer-events-auto"
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Contact Section */}
        <section id="contato" className="py-20 bg-muted/30">
          <div className="container">
            <motion.div
              className="flex flex-col items-center text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Contato</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Entre em Contato</h2>
              <p className="max-w-[800px] text-muted-foreground">
                Estamos à disposição para atender suas necessidades jurídicas. Entre em contato conosco para agendar uma
                consulta ou obter mais informações sobre nossos serviços.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Agende uma Consulta</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Nome
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Seu nome"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="seu.email@exemplo.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Telefone
                        </label>
                        <input
                          id="phone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="(21) 00000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium">
                          Área de Interesse
                        </label>
                        <select
                          id="service"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Selecione uma área</option>
                          <option value="civil">Direito Civil</option>
                          <option value="trabalhista">Direito Trabalhista</option>
                          <option value="empresarial">Direito Empresarial</option>
                          <option value="familia">Direito de Família</option>
                          <option value="mediacao">Mediação e Arbitragem</option>
                          <option value="consultoria">Consultoria Jurídica</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Descreva brevemente sua necessidade jurídica"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full">
                          Enviar Mensagem
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Escritório</h4>
                      <p className="text-muted-foreground">
                        Estrada Deputado Octávio Cabral 740, sala 609, Edifício Trend.
                        <br />
                        Itaguaí - RJ
                        <br />
                        CEP: 23.810-305
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Telefone</h4>
                      <p className="text-muted-foreground">(21) 98156-5120</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-muted-foreground">caraujo.juridico@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Horário de Atendimento</h4>
                      <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-muted-foreground">Sábados: 9h às 12h (com agendamento prévio)</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-10">
                  <h4 className="font-medium mb-4">Siga-nos nas Redes Sociais</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: "instagram", url: "https://www.instagram.com/almeidaearaujo_advocacia" },
                      { icon: "facebook", url: "#" },
                      { icon: "linkedin", url: "#" },
                      { icon: "youtube", url: "#" },
                    ].map((social) => (
                      <motion.div key={social.icon} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link
                          href={social.url}
                          className="h-12 w-12 rounded-full bg-card flex items-center justify-center border hover:bg-primary/10 hover:border-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-instagram text-primary"
                          >
                            {social.icon === "instagram" && (
                              <>
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                              </>
                            )}
                            {social.icon === "facebook" && (
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            )}
                            {social.icon === "linkedin" && (
                              <>
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                              </>
                            )}
                            {social.icon === "youtube" && (
                              <>
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                              </>
                            )}
                          </svg>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="mt-10">
                  <h4 className="font-medium mb-4">Localização</h4>
                  <div className="h-[250px] rounded-lg overflow-hidden border shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.8881856027283!2d-43.77944232475417!3d-22.95169237919761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be00b2ddcb3b3%3A0x5c1e4e9f34e9c4c0!2sR.%20Gen.%20Bocai%C3%BAvaf0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be00b2ddcb3b3%3A0x5c1e4e9f34e9c4c0!2sR.%20Gen.%20Bocai%C3%BAva%20-%20Centro%2C%20Itagua%C3%AD%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1716318547971!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização do Escritório"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Almeida & Araujo</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Excelência jurídica e compromisso com resultados. Defendendo seus direitos com dedicação e
                profissionalismo desde 2005.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/almeidaearaujo_advocacia"
                  className="h-8 w-8 rounded-full bg-card flex items-center justify-center border hover:bg-primary/10 hover:border-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-card flex items-center justify-center border hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-card flex items-center justify-center border hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Links Rápidos</h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("inicio")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
                <Link
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("servicos")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
                <Link
                  href="#sobre"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("sobre")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre
                </Link>
                <Link
                  href="#equipe"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("equipe")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Equipe
                </Link>
                <Link
                  href="#depoimentos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("depoimentos")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Depoimentos
                </Link>
                <Link
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contato")
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Rua General Bocaiuva, 1250
                    <br />
                    Centro, Itaguaí - RJ
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">(21) 3781-0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">contato@almeidaearaujo.adv.br</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Almeida & Araujo Advocacia. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1.5,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href="https://wa.me/5521981565120?text=Olá! Gostaria de agendar uma consulta jurídica."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </Link>
      </motion.div>

      {/* Back to top button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            className="fixed bottom-6 left-6 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            onClick={() => scrollToSection("inicio")}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5 rotate-[-90deg]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
