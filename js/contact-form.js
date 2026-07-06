/**
 * Two-mode contact form: "Contact me" and "Got a referral for me?".
 * No backend — this is a static site, so submitting builds a mailto:
 * link with the fields folded into the subject/body and hands off to
 * the visitor's own email client. Swap `sendViaMailto` for a fetch()
 * call to a form service (Formspree, EmailJS, a serverless function...)
 * if you want it to send silently instead — see README.
 */
const TO_EMAIL = 'ahujayash460@gmail.com';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const switchEl = document.querySelector('.contact__switch');
  const btnContact = document.getElementById('switch-contact');
  const btnReferral = document.getElementById('switch-referral');
  const fieldGroups = form.querySelectorAll('[data-fields]');
  const submitLabel = document.getElementById('contact-submit-label');

  function setMode(mode) {
    switchEl.dataset.active = mode;
    btnContact.classList.toggle('is-active', mode === 'contact');
    btnReferral.classList.toggle('is-active', mode === 'referral');
    btnContact.setAttribute('aria-selected', String(mode === 'contact'));
    btnReferral.setAttribute('aria-selected', String(mode === 'referral'));

    fieldGroups.forEach((group) => {
      const isActive = group.dataset.fields === mode;
      group.hidden = !isActive;
      group.querySelectorAll('input, textarea').forEach((el) => {
        // only the name/email/message/company fields are hard-required;
        // optional fields (link, notes, referrer role) stay optional
        const hardRequired = ['c-name', 'c-email', 'c-message', 'r-company'].includes(el.id);
        el.required = isActive && hardRequired;
      });
    });

    submitLabel.textContent = mode === 'contact' ? 'Send message' : 'Send referral details';
  }

  btnContact.addEventListener('click', () => setMode('contact'));
  btnReferral.addEventListener('click', () => setMode('referral'));
  setMode('contact');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const mode = switchEl.dataset.active;
    const data = Object.fromEntries(new FormData(form).entries());
    const mailto = mode === 'contact' ? buildContactMailto(data) : buildReferralMailto(data);
    document.dispatchEvent(new CustomEvent('sfx', { detail: 'submit' }));
    window.location.href = mailto;
  });

  function buildContactMailto({ name, email, message }) {
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function buildReferralMailto({ referrerName, referrerRole, company, position, link, notes }) {
    const subject = `Referral: ${company || 'a role'}${position ? ' — ' + position : ''}`;
    const lines = [
      `Company: ${company || '—'}`,
      `Position / Job ID: ${position || '—'}`,
      link ? `Posting: ${link}` : null,
      notes ? `\nNotes:\n${notes}` : null,
      `\n—`,
      `${referrerName || 'Anonymous'}${referrerRole ? ' · ' + referrerRole : ''}`,
    ].filter(Boolean);
    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }
}
