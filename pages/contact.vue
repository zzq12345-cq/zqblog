<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="reveal">{{ $t('contact.title') }}</h1>
        <p class="page-subtitle reveal delay-1">{{ $t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-form-wrap reveal">
            <form ref="formRef" @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">{{ $t('contact.form_name') }}</label>
                  <input id="name" name="user_name" v-model="form.name" type="text" required />
                </div>
                <div class="form-group">
                  <label for="email">{{ $t('contact.form_email') }}</label>
                  <input id="email" name="user_email" v-model="form.email" type="email" required />
                </div>
              </div>
              <div class="form-group">
                <label for="subject">{{ $t('contact.form_subject') }}</label>
                <input id="subject" name="subject" v-model="form.subject" type="text" required />
              </div>
              <div class="form-group">
                <label for="message">{{ $t('contact.form_message') }}</label>
                <textarea id="message" name="message" v-model="form.message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn-submit" :disabled="sending">
                {{ sending ? $t('contact.form_sending') : $t('contact.form_submit') }}
              </button>
              <p v-if="status === 'success'" class="form-status success">✅ {{ $t('contact.form_success') }}</p>
              <p v-if="status === 'error'" class="form-status error">❌ {{ $t('contact.form_error') }}</p>
            </form>
          </div>

          <div class="contact-aside reveal delay-1">
            <h3>{{ $t('contact.info_title') }}</h3>
            <div class="contact-links">
              <a href="mailto:2477664538@qq.com" class="contact-card">
                <span class="cl-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <span class="cl-text">
                  <span class="cl-label">Email</span>
                  <span class="cl-value">2477664538@qq.com</span>
                </span>
              </a>
              <a href="mailto:Zzqq0326@linux.do" class="contact-card">
                <span class="cl-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </span>
                <span class="cl-text">
                  <span class="cl-label">Linux.do</span>
                  <span class="cl-value">Zzqq0326@linux.do</span>
                </span>
              </a>
              <a href="https://github.com/zzq12345-cq" target="_blank" class="contact-card">
                <span class="cl-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </span>
                <span class="cl-text">
                  <span class="cl-label">GitHub</span>
                  <span class="cl-value">zzq12345-cq</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import emailjs from '@emailjs/browser'

const { t, locale } = useI18n()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '联系我 - 周志琪 | 合作与咨询' : 'Contact - Zhou Zhiqi | Collaboration',
  meta: [
    { name: 'description', content: locale.value === 'zh' ? '联系周志琪，邮件咨询AI开发、全栈项目合作、技术交流' : 'Contact Zhou Zhiqi for AI development, full-stack collaboration and tech exchange' },
  ],
})

const formRef = ref(null)
const form = reactive({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const status = ref('')

// ⚠️ 请替换为你自己的 EmailJS 配置
const EMAILJS_SERVICE_ID = 'service_4d8d41i'
const EMAILJS_TEMPLATE_ID = 'template_3dsqej5'
const EMAILJS_PUBLIC_KEY = '_g3LokSOyMtZelazJ'

const handleSubmit = async () => {
  if (!formRef.value) return
  sending.value = true
  status.value = ''

  try {
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.value,
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    console.error('EmailJS Error:', error)
    status.value = 'error'
  } finally {
    sending.value = false
    setTimeout(() => { status.value = '' }, 5000)
  }
}
</script>

<style scoped>
.page-hero {
  padding: 160px 0 60px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.page-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 40%;
  width: 400px;
  height: 250px;
  background: radial-gradient(ellipse, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.page-hero::after {
  content: '';
  position: absolute;
  top: 40px;
  right: 20%;
  width: 350px;
  height: 200px;
  background: radial-gradient(ellipse, rgba(6, 182, 212, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 17px;
  color: var(--color-text-secondary);
}

.contact-section {
  padding: 56px 0 96px;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 64px;
  align-items: start;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  padding: 14px 28px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  width: fit-content;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.35), inset 0 1px 0 rgba(255,255,255,0.1);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-status {
  margin-top: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

.form-status.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.form-status.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Aside */
.contact-aside h3 {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
  margin-bottom: 20px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: rgba(10, 18, 38, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s;
}

.contact-card:hover {
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.08);
}

.cl-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: 10px;
  color: var(--color-primary-light);
  flex-shrink: 0;
}

.cl-text {
  display: flex;
  flex-direction: column;
}

.cl-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 2px;
}

.cl-value {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
