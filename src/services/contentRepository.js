/**
 * OLOID Content Repository Service
 * 
 * Centralized data access abstraction layer. Currently serves static local data modules.
 * In future phases, these methods can be converted to asynchronous API fetchers (e.g. REST/GraphQL)
 * without requiring any UI component rewrites.
 */

import { companyData } from '../data/company.js';
import { serviceCategories, productsAndServicesData } from '../data/services.js';
import { partnersData } from '../data/partners.js';
import { newsData } from '../data/news.js';
import { careersData } from '../data/careers.js';
import { mainNavLinks, footerNavigation } from '../data/navigation.js';

export const contentRepository = {
  // Company Information
  getCompany: () => companyData,
  getDivisions: () => companyData.divisions,
  getOffices: () => companyData.offices,
  getHeadquarters: () => companyData.offices.find(o => o.isHeadquarters),
  getStats: () => companyData.stats,
  getValues: () => companyData.values,

  // Products & Services
  getCategories: () => serviceCategories,
  getCategoryBySlug: (slug) => serviceCategories.find(c => c.slug === slug),
  getAllServices: () => productsAndServicesData,
  getServiceBySlug: (slug) => productsAndServicesData.find(s => s.slug === slug),
  getServicesByCategory: (categorySlug) => {
    if (!categorySlug || categorySlug === 'all') return productsAndServicesData;
    return productsAndServicesData.filter(s => s.categorySlug === categorySlug);
  },
  getFeaturedServices: () => productsAndServicesData.slice(0, 6),
  getRelatedServices: (currentSlug, limit = 3) => {
    const current = productsAndServicesData.find(s => s.slug === currentSlug);
    if (!current) return productsAndServicesData.slice(0, limit);
    return productsAndServicesData
      .filter(s => s.slug !== currentSlug && s.categorySlug === current.categorySlug)
      .slice(0, limit);
  },

  // Strategic Partners
  getAllPartners: () => partnersData,
  getFeaturedPartners: () => partnersData.filter(p => p.featured),
  getPartnerBySlug: (slug) => partnersData.find(p => p.slug === slug),
  getPartnersByCategory: (category) => partnersData.filter(p => p.category === category),

  // News & Announcements
  getAllNews: () => newsData,
  getFeaturedNews: () => newsData.filter(n => n.featured),
  getNewsBySlug: (slug) => newsData.find(n => n.slug === slug),
  getRecentNews: (limit = 3) => newsData.slice(0, limit),

  // Careers
  getCareers: () => careersData,
  getOpenPositions: () => careersData.openDisciplines,
  getPositionById: (id) => careersData.openDisciplines.find(p => p.id === id),

  // Navigation
  getNavLinks: () => mainNavLinks,
  getFooterNav: () => footerNavigation
};

export default contentRepository;

