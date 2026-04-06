<template>
  <div class="contact-page">
    <section class="page-header">
      <div class="container">
        <h1 class="reveal">{{ $t('contact.title') }}</h1>
        <p class="reveal delay-1">{{ $t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div class="contact-form-wrapper reveal-left">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label :for="'name'">{{ $t('contact.form_name') }}</label>
                <input id="name" v-model="form.name" type="text" required />
              </div>
              <div class="form-group">
                <label :for="'email'">{{ $t('contact.form_email') }}</label>
                <input id="email" v-model="form.email" type="email" required />
              </div>
              <div class="form-group">
                <label :for="'subject'">{{ $t('contact.form_subject') }}</label>
                <input id="subject" v-model="form.subject" type="text" required />
              </div>
              <div class="form-group">
                <label :for="'message'">{{ $t('contact.form_message') }}</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-full" :disabled="sending">
                <svg v-if="!sending" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                <span v-if="sending" class="spinner"></span>
                {{ sending ? $t('contact.form_sending') : $t('contact.form_submit') }}
              </button>

              <Transition name="fade">
                <div v-if="status" class="form-status" :class="status">
                  {{ status === 'success' ? $t('contact.form_success') : $t('contact.form_error') }}
                </div>
              </Transition>
            </form>
          </div>

          <!-- Info -->
          <div class="contact-info reveal-right">
            <h3>{{ $t('contact.info_title') }}</h3>

            <div class="info-cards">
              <a href="mailto:2477664538@qq.com" class="info-card hover-lift">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">QQ {{ $t('contact.info_email') }}</span>
                  <span class="info-value">2477664538@qq.com</span>
                </div>
              </a>

              <a href="mailto:Zzqq0326@linux.do" class="info-card hover-lift">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">Linux.do {{ $t('contact.info_email') }}</span>
                  <span class="info-value">Zzqq0326@linux.do</span>
                </div>
              </a>

              <a href="https://github.com/ice-kele" target="_blank" rel="noopener" class="info-card hover-lift">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">GitHub</span>
                  <span class="info-value">ice-kele</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '联系我 | 周志琪' : 'Contact | Zhou Zhiqi',
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sending = ref(false)
const status = ref(null)

const handleSubmit = async () => {
  sending.value = true
  status.value = null
  try {
    // 简单的 mailto 方案
    const mailtoLink = `mailto:2477664538@qq.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
    window.open(mailtoLink, '_blank')
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
    setTimeout(() => { status.value = null }, 5000)
  }
}
</script>

<style scoped>
.page-header {
  padding: var(--space-32) 0 var(--space-16);
  text-align: center;
  background: var(--gradient-hero);
}

.page-header h1 { margin-bottom: var(--space-4); }
.page-header p { font-size: var(--font-size-lg); color: var(--color-text-secondary); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-full {
  width: 100%;
  justify-content: center;
  padding: var(--space-4);
  font-size: var(--font-size-base);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  border: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(37, 99, 235, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.form-status {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.form-status.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.form-status.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Info */
.contact-info h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-8);
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.info-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text);
}

.info-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.info-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-top: var(--space-1);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
