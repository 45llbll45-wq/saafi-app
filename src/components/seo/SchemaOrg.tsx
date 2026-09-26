import React from 'react';
import { SITE_CONFIG } from '@/lib/seo-config';

interface WebApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}

export const WebApplicationSchema: React.FC<WebApplicationSchemaProps> = ({
  name,
  description,
  url,
  applicationCategory = 'BusinessApplication',
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'SAR',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  tags?: string[];
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  authorName,
  tags = [],
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.domain}/logo.png`,
      },
    },
    keywords: tags.join(', '),
    inLanguage: 'ar',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.domain}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
