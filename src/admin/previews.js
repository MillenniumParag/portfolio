/**
 * Decap CMS Native Live Preview Templates
 * 
 * Uses Decap CMS built-in `window.createClass` and `window.h` (Hyperscript)
 * with zero external dependencies. Provides real-time visual feedback for all
 * pages, collections, and global site settings.
 */
(function () {
  if (!window.CMS || !window.createClass || !window.h) {
    console.warn('[Decap Previews] Native CMS globals not found on window.');
    return;
  }

  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

  // Register Stylesheets inside the Decap CMS Preview iframe
  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

  /**
   * Safely convert Decap CMS Immutable Map entry to plain JavaScript object
   */
  function toData(entry) {
    if (!entry) return {};
    try {
      var d = entry.get ? entry.get('data') : entry.data;
      if (!d) return {};
      return d.toJS ? d.toJS() : d;
    } catch (e) {
      return {};
    }
  }

  /**
   * Safely resolve image asset path via this.props.getAsset
   */
  function assetUrl(getAsset, path) {
    if (!path) return '';
    try {
      var asset = getAsset ? getAsset(path) : null;
      return asset ? asset.toString() : path;
    } catch (e) {
      return path;
    }
  }

  /**
   * Reusable Google Search Snippet Card
   */
  function renderGooglePreview(url, title, description) {
    return h('div', { className: 'preview-seo-card' },
      h('div', { className: 'preview-seo-header' }, '🔍 Google Search Appearance Preview'),
      h('div', { className: 'preview-google-box' },
        h('div', { className: 'preview-google-url' }, url || 'https://paragchatterjee.me/'),
        h('div', { className: 'preview-google-title' }, title || 'Page Title will appear here...'),
        h('div', { className: 'preview-google-desc' }, description || 'Meta description will appear here in Google/Bing search results...')
      )
    );
  }

  /* ==========================================================================
     1. HOME PAGE PREVIEW
     ========================================================================== */
  var HomePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var hero = data.hero || {};
      var stats = Array.isArray(data.stats) ? data.stats : [];
      var pillars = Array.isArray(data.pillars) ? data.pillars : [];
      var cta = data.cta || {};
      var heroImg = assetUrl(this.props.getAsset, hero.image || '/uploads/me.avif');

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Home Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/', data.title, data.description),

        // Hero Section
        h('div', { className: 'preview-hero-container' },
          h('div', { className: 'preview-hero-layout' },
            h('div', { className: 'preview-hero-text' },
              hero.badge ? h('div', { className: 'preview-pill' }, hero.badge) : null,
              h('h1', { className: 'preview-headline' }, hero.headline || 'Main Headline'),
              h('p', { className: 'preview-bio' }, hero.bio || 'Bio Summary...'),
              h('div', { className: 'preview-buttons' },
                hero.primaryButtonText ? h('span', { className: 'preview-btn-primary' }, hero.primaryButtonText) : null,
                hero.secondaryButtonText ? h('span', { className: 'preview-btn-outline' }, hero.secondaryButtonText) : null,
                hero.cvButtonText ? h('span', { className: 'preview-btn-ghost' }, hero.cvButtonText) : null
              )
            ),
            heroImg ? h('div', { className: 'preview-hero-img-wrap' },
              h('img', {
                src: heroImg,
                alt: hero.imageAlt || 'Hero portrait',
                className: 'preview-hero-img'
              })
            ) : null
          ),

          // Key Stats
          stats.length > 0 ? h('div', { className: 'preview-stats-grid' },
            stats.map(function (stat, idx) {
              return h('div', { key: idx, className: 'preview-stat-card' },
                h('div', { className: 'preview-stat-val' }, stat.value || '0'),
                h('div', { className: 'preview-stat-lbl' }, stat.label || '')
              );
            })
          ) : null
        ),

        // Engineering Pillars
        pillars.length > 0 ? h('div', {},
          h('h2', { className: 'preview-section-title' },
            h('span', { className: 'preview-section-tag' }, 'Section'),
            data.projectsSectionTitle || 'Engineering & Practice'
          ),
          h('div', { className: 'preview-pillars-grid' },
            pillars.map(function (p, idx) {
              var tags = Array.isArray(p.tags) ? p.tags : [];
              return h('div', { key: idx, className: 'preview-pillar-card' },
                h('h3', { className: 'preview-pillar-title' }, p.title || 'Pillar Title'),
                h('p', { className: 'preview-pillar-desc' }, p.description || ''),
                tags.length > 0 ? h('div', { className: 'preview-tags' },
                  tags.map(function (t, ti) {
                    return h('span', { key: ti, className: 'preview-tag' }, t);
                  })
                ) : null
              );
            })
          )
        ) : null,

        // Call to action
        cta.title ? h('div', { className: 'preview-cta-card' },
          h('h3', { className: 'preview-cta-title' }, cta.title),
          cta.subtitle ? h('p', { className: 'preview-cta-desc' }, cta.subtitle) : null,
          cta.buttonText ? h('span', { className: 'preview-btn-primary' }, cta.buttonText) : null
        ) : null
      );
    }
  });

  /* ==========================================================================
     2. ABOUT PAGE PREVIEW
     ========================================================================== */
  var AboutPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var bioCard = data.bioCard || {};
      var education = data.education || {};
      var storyParas = Array.isArray(data.storyParagraphs) ? data.storyParagraphs : [];
      var principles = Array.isArray(data.principles) ? data.principles : [];
      var quickFacts = Array.isArray(data.quickFacts) ? data.quickFacts : [];
      var workstation = data.workstation || {};
      var cta = data.cta || {};

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • About Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/about/', data.title, data.description),

        // Intro Header
        h('div', { className: 'preview-hero-container' },
          data.introBadge ? h('div', { className: 'preview-pill' }, data.introBadge) : null,
          h('h1', { className: 'preview-headline' }, data.headline || 'About Parag'),
          h('p', { className: 'preview-bio' }, data.intro || ''),
          h('div', { className: 'preview-buttons' },
            data.primaryButtonText ? h('span', { className: 'preview-btn-primary' }, data.primaryButtonText) : null,
            data.secondaryButtonText ? h('span', { className: 'preview-btn-outline' }, data.secondaryButtonText) : null
          )
        ),

        // Bio Card
        bioCard.name ? h('div', { className: 'preview-bio-card' },
          h('img', {
            src: assetUrl(this.props.getAsset, bioCard.avatar || '/uploads/me.avif'),
            alt: bioCard.name,
            className: 'preview-avatar-img'
          }),
          h('h3', { className: 'preview-card-name' }, bioCard.name),
          bioCard.role ? h('div', { className: 'preview-card-role' }, bioCard.role) : null,
          bioCard.summary ? h('p', { className: 'preview-card-summary' }, bioCard.summary) : null,
          h('div', { className: 'preview-tags', style: { justifyContent: 'center' } },
            bioCard.badge1 ? h('span', { className: 'preview-tag' }, bioCard.badge1) : null,
            bioCard.badge2 ? h('span', { className: 'preview-tag' }, bioCard.badge2) : null
          )
        ) : null,

        // Story Section
        data.storyTitle ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, data.storyTitle),
          storyParas.map(function (p, idx) {
            var text = typeof p === 'string' ? p : (p.para || '');
            return h('p', { key: idx, className: 'preview-item-desc' }, text);
          })
        ) : null,

        // Education Card
        education.degree ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🎓 Education & Foundations'),
          h('h3', { className: 'preview-item-title' }, education.degree),
          h('div', { className: 'preview-item-meta' }, (education.school || '') + (education.period ? ' • ' + education.period : '')),
          education.gpa ? h('div', { style: { fontSize: '12px', fontWeight: '700', color: '#10b981', marginBottom: '8px' } }, 'GPA: ' + education.gpa) : null,
          education.description ? h('p', { className: 'preview-item-desc' }, education.description) : null,
          Array.isArray(education.coursework) && education.coursework.length > 0 ? h('div', { className: 'preview-tags' },
            education.coursework.map(function (c, ci) {
              return h('span', { key: ci, className: 'preview-tag' }, c);
            })
          ) : null
        ) : null,

        // Principles
        principles.length > 0 ? h('div', {},
          h('h2', { className: 'preview-section-title' }, '⭐ Principles & Work Ethic'),
          h('div', { className: 'preview-pillars-grid' },
            principles.map(function (pr, pi) {
              return h('div', { key: pi, className: 'preview-pillar-card' },
                h('h3', { className: 'preview-pillar-title' }, pr.title || ''),
                h('p', { className: 'preview-pillar-desc' }, pr.description || '')
              );
            })
          )
        ) : null,

        // Quick Facts
        quickFacts.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '⚡ Quick Facts'),
          h('div', { className: 'preview-tags' },
            quickFacts.map(function (q, qi) {
              return h('span', { key: qi, className: 'preview-pill' }, (q.label ? q.label + ': ' : '') + (q.value || ''));
            })
          )
        ) : null,

        // Experience & Training Tab Preview
        Array.isArray(data.timeline) && data.timeline.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '💼 Experience & Practical Training (Tab 2)'),
          h('div', { className: 'preview-timeline' },
            data.timeline.map(function (item, idx) {
              var skills = Array.isArray(item.skills) ? item.skills : [];
              return h('div', { key: idx, className: 'preview-timeline-item' },
                h('h3', { className: 'preview-item-title' }, item.role || 'Role Title'),
                h('div', { className: 'preview-item-meta' },
                  (item.company || '') +
                  (item.type ? ' • ' + item.type : '') +
                  (item.period ? ' • ' + item.period : '')
                ),
                item.description ? h('p', { className: 'preview-item-desc' }, item.description) : null,
                skills.length > 0 ? h('div', { className: 'preview-tags' },
                  skills.map(function (sk, ski) {
                    return h('span', { key: ski, className: 'preview-tag' }, sk);
                  })
                ) : null
              );
            })
          )
        ) : null,

        // Workstation & Gear Preview
        workstation.headline ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '💻 ' + workstation.headline),
          workstation.intro ? h('p', { className: 'preview-item-desc' }, workstation.intro) : null,
          h('div', { style: { fontSize: '12px', color: '#64748b', fontStyle: 'italic', marginTop: '8px' } },
            'Hardware, DevTools, Terminal, and Apps configured under this section render inside the "Gear" tab on the About page.'
          )
        ) : null,

        // CTA
        cta.title ? h('div', { className: 'preview-cta-card' },
          h('h3', { className: 'preview-cta-title' }, cta.title),
          cta.subtitle ? h('p', { className: 'preview-cta-desc' }, cta.subtitle) : null,
          cta.buttonText ? h('span', { className: 'preview-btn-primary' }, cta.buttonText) : null
        ) : null
      );
    }
  });

  /* ==========================================================================
     3. EXPERIENCE PAGE PREVIEW
     ========================================================================== */
  var ExperiencePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var timeline = Array.isArray(data.timeline) ? data.timeline : [];
      var edu = data.educationCard || {};

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Experience Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/experience/', data.title, data.description),

        // Header
        h('div', { className: 'preview-hero-container' },
          data.badgeText ? h('div', { className: 'preview-pill' }, data.badgeText) : null,
          h('h1', { className: 'preview-headline' }, data.headline || 'Work Experience'),
          h('p', { className: 'preview-bio' }, data.intro || '')
        ),

        // Timeline
        h('h2', { className: 'preview-section-title' }, '💼 Career & Practical Training Timeline'),
        timeline.length > 0 ? h('div', { className: 'preview-timeline' },
          timeline.map(function (item, idx) {
            var highlights = Array.isArray(item.highlights) ? item.highlights : [];
            var skills = Array.isArray(item.skills) ? item.skills : [];

            return h('div', { key: idx, className: 'preview-timeline-item' },
              h('h3', { className: 'preview-item-title' }, item.role || 'Role Title'),
              h('div', { className: 'preview-item-meta' },
                (item.company || '') +
                (item.type ? ' • ' + item.type : '') +
                (item.period ? ' • ' + item.period : '') +
                (item.location ? ' • ' + item.location : '')
              ),
              item.description ? h('p', { className: 'preview-item-desc' }, item.description) : null,
              highlights.length > 0 ? h('ul', { className: 'preview-item-bullets' },
                highlights.map(function (hl, hli) {
                  return h('li', { key: hli }, hl);
                })
              ) : null,
              skills.length > 0 ? h('div', { className: 'preview-tags' },
                skills.map(function (sk, ski) {
                  return h('span', { key: ski, className: 'preview-tag' }, sk);
                })
              ) : null
            );
          })
        ) : h('div', { className: 'preview-empty-hint' }, 'No timeline experience items added yet.'),

        // Education Card
        edu.degree ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🎓 Academic Foundations'),
          h('h3', { className: 'preview-item-title' }, edu.degree),
          h('div', { className: 'preview-item-meta' }, (edu.school || '') + (edu.period ? ' • ' + edu.period : '')),
          edu.gpa ? h('div', { style: { fontSize: '12px', fontWeight: '700', color: '#10b981', marginBottom: '8px' } }, 'GPA: ' + edu.gpa) : null,
          Array.isArray(edu.honors) && edu.honors.length > 0 ? h('div', { className: 'preview-tags' },
            edu.honors.map(function (hn, hni) {
              return h('span', { key: hni, className: 'preview-tag' }, '🏆 ' + hn);
            })
          ) : null
        ) : null
      );
    }
  });

  /* ==========================================================================
     4. RESUME / CV PAGE PREVIEW
     ========================================================================== */
  var ResumePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var statsBanner = Array.isArray(data.statsBanner) ? data.statsBanner : [];
      var skills = Array.isArray(data.skills) ? data.skills : [];
      var experience = Array.isArray(data.experience) ? data.experience : [];
      var projects = Array.isArray(data.projects) ? data.projects : [];
      var education = data.education || {};
      var certifications = Array.isArray(data.certifications) ? data.certifications : [];

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Resume / CV Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/resume/', data.title, data.description),

        // Resume Header Card
        h('div', { className: 'preview-hero-container' },
          h('h1', { className: 'preview-headline', style: { marginBottom: '4px' } }, data.name || 'Parag Chatterjee'),
          h('div', { className: 'preview-item-meta', style: { fontSize: '14px', marginBottom: '12px' } }, data.role || 'Aspiring Software Engineer'),
          h('div', { className: 'preview-tags', style: { marginBottom: '14px' } },
            data.location ? h('span', { className: 'preview-tag' }, '📍 ' + data.location) : null,
            data.email ? h('span', { className: 'preview-tag' }, '✉️ ' + data.email) : null,
            data.linkedin ? h('span', { className: 'preview-tag' }, '💼 LinkedIn') : null,
            data.github ? h('span', { className: 'preview-tag' }, '🐙 GitHub') : null
          ),
          data.summary ? h('p', { className: 'preview-bio' }, data.summary) : null,

          // Stats Banner
          statsBanner.length > 0 ? h('div', { className: 'preview-stats-grid' },
            statsBanner.map(function (st, sti) {
              return h('div', { key: sti, className: 'preview-stat-card' },
                h('div', { className: 'preview-stat-val' }, st.value || '0'),
                h('div', { className: 'preview-stat-lbl' }, st.label || '')
              );
            })
          ) : null
        ),

        // Technical Competencies
        skills.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🛠️ Technical Competencies'),
          skills.map(function (cat, ci) {
            var items = Array.isArray(cat.items) ? cat.items : [];
            return h('div', { key: ci, style: { marginBottom: '12px' } },
              h('div', { style: { fontSize: '12px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' } }, cat.category || 'Category'),
              h('div', { className: 'preview-tags' },
                items.map(function (it, iti) {
                  return h('span', { key: iti, className: 'preview-tag' }, it);
                })
              )
            );
          })
        ) : null,

        // Work Experience
        experience.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '💼 Professional & Practical Experience'),
          experience.map(function (exp, ei) {
            var points = Array.isArray(exp.points) ? exp.points : [];
            return h('div', { key: ei, style: { marginBottom: '16px' } },
              h('h3', { className: 'preview-item-title' }, exp.role || ''),
              h('div', { className: 'preview-item-meta' }, (exp.company || '') + (exp.period ? ' • ' + exp.period : '') + (exp.location ? ' • ' + exp.location : '')),
              points.length > 0 ? h('ul', { className: 'preview-item-bullets' },
                points.map(function (pt, pti) {
                  return h('li', { key: pti }, pt);
                })
              ) : null
            );
          })
        ) : null,

        // Academic Projects
        projects.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🚀 Key Engineering Projects'),
          projects.map(function (prj, pi) {
            var pts = Array.isArray(prj.points) ? prj.points : [];
            return h('div', { key: pi, style: { marginBottom: '14px' } },
              h('h3', { className: 'preview-item-title' }, prj.title || ''),
              prj.tech ? h('div', { className: 'preview-item-meta' }, 'Stack: ' + prj.tech) : null,
              pts.length > 0 ? h('ul', { className: 'preview-item-bullets' },
                pts.map(function (pt, pti) {
                  return h('li', { key: pti }, pt);
                })
              ) : null
            );
          })
        ) : null,

        // Education & Certifications
        education.degree ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🎓 Education'),
          h('h3', { className: 'preview-item-title' }, education.degree),
          h('div', { className: 'preview-item-meta' }, (education.institution || '') + (education.period ? ' • ' + education.period : '')),
          education.gpa ? h('div', { style: { fontSize: '12px', fontWeight: '700', color: '#10b981' } }, 'GPA: ' + education.gpa) : null
        ) : null,

        certifications.length > 0 ? h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '📜 Certifications & Honors'),
          h('ul', { className: 'preview-item-bullets' },
            certifications.map(function (c, ci) {
              return h('li', { key: ci }, c);
            })
          )
        ) : null
      );
    }
  });

  /* ==========================================================================
     5. PROJECTS CATALOG PAGE PREVIEW
     ========================================================================== */
  var ProjectsPagePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var cta = data.cta || {};

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Projects Catalog Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/projects/', data.title, data.description),

        h('div', { className: 'preview-hero-container' },
          data.badgeText ? h('div', { className: 'preview-pill' }, data.badgeText) : null,
          h('h1', { className: 'preview-headline' }, data.headerTitle || 'Featured Projects'),
          h('p', { className: 'preview-bio' }, data.headerDescription || '')
        ),

        h('div', { className: 'preview-empty-hint' },
          'ℹ️ Projects displayed on this page are dynamically loaded from the "Portfolio Projects" collection in the sidebar.'
        ),

        cta.title ? h('div', { className: 'preview-cta-card' },
          h('h3', { className: 'preview-cta-title' }, cta.title),
          cta.subtitle ? h('p', { className: 'preview-cta-desc' }, cta.subtitle) : null,
          cta.buttonText ? h('span', { className: 'preview-btn-primary' }, cta.buttonText) : null
        ) : null
      );
    }
  });

  /* ==========================================================================
     6. BLOG CATALOG PAGE PREVIEW
     ========================================================================== */
  var BlogPagePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var cmsNotice = data.cmsNotice || {};

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Blog Catalog Page'),
          h('span', { className: 'preview-notice-tag' }, 'Instant Live Changes')
        ),

        renderGooglePreview('https://paragchatterjee.me/blog/', data.title, data.description),

        h('div', { className: 'preview-hero-container' },
          data.badgeText ? h('div', { className: 'preview-pill' }, data.badgeText) : null,
          h('h1', { className: 'preview-headline' }, data.headerTitle || 'Articles & Engineering Notes'),
          h('p', { className: 'preview-bio' }, data.headerDescription || '')
        ),

        cmsNotice.title ? h('div', { className: 'preview-card', style: { borderColor: '#bbf7d0', background: '#f0fdf4' } },
          h('h3', { style: { fontSize: '14px', fontWeight: '800', color: '#166534', margin: '0 0 4px 0' } }, cmsNotice.title),
          cmsNotice.description ? h('p', { style: { fontSize: '12px', color: '#15803d', margin: 0 } }, cmsNotice.description) : null
        ) : null,

        h('div', { className: 'preview-empty-hint' },
          'ℹ️ Blog articles displayed on this page are dynamically loaded from the "Blog Articles" collection in the sidebar.'
        )
      );
    }
  });

  /* ==========================================================================
     7. INDIVIDUAL PORTFOLIO PROJECT PREVIEW
     ========================================================================== */
  var ProjectPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var techStack = Array.isArray(data.techStack) ? data.techStack : [];
      var bannerImg = assetUrl(this.props.getAsset, data.image);

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Project Case Study'),
          h('span', { className: 'preview-notice-tag' }, data.category || 'Project')
        ),

        renderGooglePreview('https://paragchatterjee.me/projects/' + (entry.get('slug') || 'slug') + '/', data.title, data.description),

        // Project Header
        h('div', { className: 'preview-hero-container' },
          h('div', { className: 'preview-tags', style: { marginBottom: '12px' } },
            data.category ? h('span', { className: 'preview-pill' }, data.category) : null,
            data.year ? h('span', { className: 'preview-tag' }, data.year) : null,
            data.featured ? h('span', { className: 'preview-tag', style: { color: '#059669', borderColor: '#a7f3d0' } }, '★ Featured on Home') : null
          ),
          h('h1', { className: 'preview-headline' }, data.title || 'Project Title'),
          data.description ? h('p', { className: 'preview-bio' }, data.description) : null,

          // Links
          h('div', { className: 'preview-buttons' },
            data.demoUrl ? h('span', { className: 'preview-btn-primary' }, 'Live Demo') : null,
            data.githubUrl ? h('span', { className: 'preview-btn-outline' }, 'GitHub Code') : null
          ),

          // Tech Stack
          techStack.length > 0 ? h('div', { className: 'preview-tags', style: { marginTop: '14px' } },
            techStack.map(function (tech, ti) {
              return h('span', { key: ti, className: 'preview-tag' }, tech);
            })
          ) : null
        ),

        // Project Cover Banner
        bannerImg ? h('div', { className: 'preview-banner-wrap' },
          h('img', {
            src: bannerImg,
            alt: data.title || 'Project banner',
            className: 'preview-banner-img'
          })
        ) : null,

        // Case study markdown content
        h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '📖 Case Study & Implementation Details'),
          h('div', { className: 'preview-body' }, this.props.widgetFor('body'))
        )
      );
    }
  });

  /* ==========================================================================
     8. INDIVIDUAL BLOG POST PREVIEW
     ========================================================================== */
  var PostPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var tags = Array.isArray(data.tags) ? data.tags : [];
      var bannerImg = assetUrl(this.props.getAsset, data.image);

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Blog Article'),
          h('span', { className: 'preview-notice-tag' }, 'Article')
        ),

        renderGooglePreview('https://paragchatterjee.me/blog/' + (entry.get('slug') || 'slug') + '/', data.title, data.description),

        // Article Title & Header
        h('div', { className: 'preview-hero-container' },
          tags.length > 0 ? h('div', { className: 'preview-tags', style: { marginBottom: '12px' } },
            tags.map(function (tg, tgi) {
              return h('span', { key: tgi, className: 'preview-pill' }, '#' + tg);
            })
          ) : null,
          h('h1', { className: 'preview-headline' }, data.title || 'Article Title'),
          h('div', { className: 'preview-item-meta' },
            'By ' + (data.author || 'Parag Chatterjee') +
            (data.date ? ' • ' + new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '')
          ),
          data.description ? h('p', { className: 'preview-bio', style: { fontStyle: 'italic', marginTop: '12px' } }, data.description) : null
        ),

        // Hero Banner Image
        bannerImg ? h('div', {},
          h('div', { className: 'preview-banner-wrap' },
            h('img', {
              src: bannerImg,
              alt: data.title || 'Article cover',
              className: 'preview-banner-img'
            })
          ),
          data.imageCaption ? h('div', { className: 'preview-banner-caption' }, data.imageCaption) : null
        ) : null,

        // Prose body
        h('div', { className: 'preview-card' },
          h('div', { className: 'preview-body' }, this.props.widgetFor('body'))
        )
      );
    }
  });

  /* ==========================================================================
     9. ANNOUNCEMENT BANNER PREVIEW (SETTINGS)
     ========================================================================== */
  var BannerPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Top Announcement Banner'),
          h('span', { className: 'preview-notice-tag', style: { background: data.enabled ? '#10b981' : '#64748b' } },
            data.enabled ? 'Active on Site' : 'Disabled / Hidden'
          )
        ),

        h('h2', { className: 'preview-section-title' }, 'Banner Visual Preview (Top of every page)'),
        data.enabled ? h('div', { className: 'preview-announcement-bar', style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            data.showPulse ? h('span', { className: 'preview-pulse-dot' }) : null,
            h('span', {}, data.text || 'Your announcement text...'),
            data.linkText ? h('span', { style: { color: '#34d399', fontWeight: '700', textDecoration: 'underline', marginLeft: '6px' } }, data.linkText) : null
          ),
          h('span', { title: 'Close banner button (public site)', style: { opacity: 0.6, fontSize: '13px', padding: '0 4px' } }, '✕')
        ) : h('div', { className: 'preview-empty-hint' }, 'The top announcement banner is currently toggled OFF in settings.')
      );
    }
  });

  /* ==========================================================================
     10. GENERAL SITE CONFIG PREVIEW (SETTINGS)
     ========================================================================== */
  var GeneralPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = toData(entry);
      var social = data.social || {};
      var verification = data.verification || {};
      var keywords = Array.isArray(data.keywords) ? data.keywords : [];

      return h('div', { className: 'cms-preview-root' },
        h('div', { className: 'preview-notice' },
          h('span', {}, '👀 Live Preview • Global Site Configuration'),
          h('span', { className: 'preview-notice-tag' }, 'Global Metadata')
        ),

        renderGooglePreview(data.url || 'https://paragchatterjee.me/', data.title, data.description),

        h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '👤 Site Identity'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Owner Name: '), data.name || 'Parag Chatterjee'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Role: '), data.role || ''),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Canonical URL: '), data.url || ''),
          keywords.length > 0 ? h('div', { style: { marginTop: '10px' } },
            h('strong', {}, 'SEO Keywords: '),
            h('div', { className: 'preview-tags', style: { marginTop: '6px' } },
              keywords.map(function (kw, kwi) {
                return h('span', { key: kwi, className: 'preview-tag' }, kw);
              })
            )
          ) : null
        ),

        h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🌐 Connected Social Links'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'LinkedIn: '), social.linkedin || 'Not configured'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'GitHub: '), social.github || 'Not configured'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Twitter / X: '), social.twitter || 'Not configured')
        ),

        h('div', { className: 'preview-card' },
          h('h2', { className: 'preview-section-title' }, '🛡️ Webmaster Verification'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Google Search Console: '), verification.google ? '✅ Token Configured' : '⚠️ Missing'),
          h('p', { style: { margin: '4px 0' } }, h('strong', {}, 'Bing Webmaster Tools: '), verification.bing ? '✅ Token Configured' : '⚠️ Missing')
        )
      );
    }
  });

  /* ==========================================================================
     REGISTER ALL PREVIEW TEMPLATES WITH DECAP CMS
     ========================================================================== */
  // File collection pages (by file slug)
  CMS.registerPreviewTemplate('home', HomePreview);
  CMS.registerPreviewTemplate('about', AboutPreview);
  CMS.registerPreviewTemplate('experience', ExperiencePreview);
  CMS.registerPreviewTemplate('resume', ResumePreview);
  CMS.registerPreviewTemplate('projects_page', ProjectsPagePreview);
  CMS.registerPreviewTemplate('blog_page', BlogPagePreview);

  // Folder collections (by collection name)
  CMS.registerPreviewTemplate('projects', ProjectPreview);
  CMS.registerPreviewTemplate('posts', PostPreview);

  // Settings files (by file slug)
  CMS.registerPreviewTemplate('banner', BannerPreview);
  CMS.registerPreviewTemplate('general', GeneralPreview);

  console.log('[Decap Previews] All custom preview templates successfully registered.');
})();
