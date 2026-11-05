import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { Application } from 'express';

describe('Advocate Practice Management Suite - API Test Suite', () => {
  let app: Application;
  const mockAdminToken = 'Bearer mock-admin-token';

  beforeAll(() => {
    app = createApp();
  });

  describe('Health Check Endpoint', () => {
    it('GET /api/health should return 200 with healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('healthy');
    });
  });

  describe('Public API Endpoints', () => {
    it('GET /api/public/profile should return advocate profile', async () => {
      const res = await request(app).get('/api/public/profile');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.full_name).toBe('Shivansh Kumar Pandey');
      expect(res.body.data.designation).toBe('Advocate');
      expect(res.body.data.email).toBe('advshiv43@gmail.com');
      expect(res.body.data.phone).toBe('+91 9198106052');
    });

    it('GET /api/public/practice-areas should return all 7 practice areas', async () => {
      const res = await request(app).get('/api/public/practice-areas');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(7);
      const slugs = res.body.data.map((p: any) => p.slug);
      expect(slugs).toContain('civil-litigation');
      expect(slugs).toContain('family-law');
      expect(slugs).toContain('taxation-gst');
      expect(slugs).toContain('business-registration');
      expect(slugs).toContain('esi-labour-welfare');
      expect(slugs).toContain('trademark-ipr');
      expect(slugs).toContain('government-schemes');
    });

    it('GET /api/public/practice-areas/:slug should return practice area with services', async () => {
      const res = await request(app).get('/api/public/practice-areas/civil-litigation');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Civil Litigation');
      expect(Array.isArray(res.body.data.services)).toBe(true);
      expect(res.body.data.services.length).toBeGreaterThan(0);
    });

    it('GET /api/public/articles should return published articles', async () => {
      const res = await request(app).get('/api/public/articles');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('POST /api/public/enquiries should reject invalid enquiry payload with 400', async () => {
      const res = await request(app).post('/api/public/enquiries').send({
        full_name: 'A',
        email: 'invalid-email',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation failed');
    });

    it('POST /api/public/enquiries should successfully accept a valid enquiry', async () => {
      const res = await request(app).post('/api/public/enquiries').send({
        full_name: 'Rajesh Verma',
        email: 'rajesh.verma@example.com',
        phone: '+91 9876543210',
        subject: 'General Enquiry Regarding Commercial Contract Vetting',
        message: 'Looking for assistance with commercial agreement review for an MSME entity in Gorakhpur.',
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
    });
  });

  describe('Security & Admin Authorization', () => {
    it('GET /api/admin/profile without token should return 401 Unauthorized', async () => {
      const res = await request(app).get('/api/admin/profile');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/profile with invalid token should return 401 Unauthorized', async () => {
      const res = await request(app)
        .get('/api/admin/profile')
        .set('Authorization', 'Bearer invalid-token-xyz');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/profile with authorized token should succeed', async () => {
      const res = await request(app)
        .get('/api/admin/profile')
        .set('Authorization', mockAdminToken);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.full_name).toBe('Shivansh Kumar Pandey');
    });

    it('POST /api/admin/articles should create draft article when authorized', async () => {
      const res = await request(app)
        .post('/api/admin/articles')
        .set('Authorization', mockAdminToken)
        .send({
          title: 'Understanding MSME Statutory Protection Under Indian Law',
          slug: 'understanding-msme-statutory-protection',
          excerpt: 'Essential legal rights of MSMEs against delayed payments under Chapter V of the MSMED Act.',
          content: '<p>The Micro, Small and Medium Enterprises Development Act, 2006 provides statutory safeguards...</p>',
          category: 'Business Registration',
          status: 'draft',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('draft');
      const articleId = res.body.data.id;

      // Publish article
      const pubRes = await request(app)
        .post(`/api/admin/articles/${articleId}/publish`)
        .set('Authorization', mockAdminToken);
      expect(pubRes.status).toBe(200);
      expect(pubRes.body.data.status).toBe('published');

      // Delete article
      const delRes = await request(app)
        .delete(`/api/admin/articles/${articleId}`)
        .set('Authorization', mockAdminToken);
      expect(delRes.status).toBe(200);
    });
  });
});

