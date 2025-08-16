# Security Features

This document outlines the security measures implemented in the Mary Skolos portfolio website.

## 🔒 Security Headers

The application includes comprehensive security headers to protect against common web vulnerabilities:

- **Content Security Policy (CSP)**: Restricts resource loading to trusted sources
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information leakage
- **Permissions-Policy**: Restricts access to sensitive browser features

## 🛡️ XSS Protection

### Content Sanitization
- All dynamic content is sanitized using DOMPurify
- HTML entities are encoded for server-side rendering
- Strict sanitization rules for HTML content

### Input Validation
- Section IDs are validated against a whitelist
- Email addresses are validated using regex patterns
- URL validation with protocol and domain restrictions

## 🔗 URL Security

### External Link Validation
- Only allows links to trusted domains (LinkedIn, GitHub, etc.)
- Protocol validation (HTTP/HTTPS only)
- Domain whitelist enforcement

### Safe Navigation
- All internal navigation uses validated section IDs
- Prevents injection attacks through URL manipulation

## 📧 Email Security

- Email addresses are validated before processing
- Mailto links are sanitized and validated
- No user input is directly used in email templates

## 🚫 Attack Prevention

### Injection Attacks
- SQL injection: Not applicable (no database)
- XSS: Prevented through content sanitization
- CSRF: Protected through same-site cookies
- Clickjacking: Blocked via X-Frame-Options

### Information Disclosure
- No sensitive data exposed in client-side code
- Error messages are generic and non-revealing
- Console warnings for invalid inputs

## 🔧 Security Configuration

### Environment-Specific Settings
- Production: Strict security policies
- Development: Relaxed policies for debugging
- Configurable rate limiting for future API endpoints

### Allowed Domains
- LinkedIn.com
- GitHub.com
- StackOverflow.com
- Dev.to

## 📋 Security Checklist

- [x] Content Security Policy implemented
- [x] XSS protection through content sanitization
- [x] Input validation and sanitization
- [x] URL validation and domain whitelisting
- [x] Security headers configured
- [x] Email validation implemented
- [x] Safe navigation practices
- [x] Error handling without information disclosure

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do not** create a public issue
2. **Do not** disclose the vulnerability publicly
3. Contact the maintainer privately
4. Allow reasonable time for response and fix

## 🔄 Security Updates

This application is regularly updated with:
- Security patches for dependencies
- Updated security policies
- Enhanced validation rules
- New security features as needed

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Web Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)

