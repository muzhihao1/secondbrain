#!/usr/bin/env node
/**
 * Contrast Checker for VNext Design Tokens
 * Verifies all color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// WCAG 2.2 Level AA Requirements
const WCAG_AA_NORMAL = 4.5;  // Normal text
const WCAG_AA_LARGE = 3.0;   // Large text (18pt+, or 14pt bold+)

/**
 * Calculate relative luminance of a color
 * @param {string} hex - Hex color code
 * @returns {number} Relative luminance (0-1)
 */
function getLuminance(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Apply gamma correction
  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - Hex color code
 * @param {string} color2 - Hex color code
 * @returns {number} Contrast ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Load color tokens from generated CSS
 * @returns {Object} Color token map
 */
function loadColorTokens() {
  const tokensPath = join(__dirname, '../../src/lib/styles/tokens.css');
  const css = readFileSync(tokensPath, 'utf-8');

  const colors = {};
  const varRefs = {};

  // First pass: capture all direct hex values
  const hexRegex = /--([^:]+):\s*(#[0-9a-fA-F]{6})/g;
  let match;
  while ((match = hexRegex.exec(css)) !== null) {
    const tokenName = match[1];
    const hexValue = match[2];
    colors[tokenName] = hexValue;
  }

  // Second pass: capture all var() references
  const varRegex = /--([^:]+):\s*var\(--([^)]+)\)/g;
  while ((match = varRegex.exec(css)) !== null) {
    const tokenName = match[1];
    const refToken = match[2];
    varRefs[tokenName] = refToken;
  }

  // Third pass: resolve var() references
  for (const [tokenName, refToken] of Object.entries(varRefs)) {
    if (colors[refToken]) {
      colors[tokenName] = colors[refToken];
    }
  }

  return colors;
}

/**
 * Check contrast for text/background combinations
 * @param {Object} colors - Color token map
 * @returns {Array} Violations
 */
function checkTextContrast(colors) {
  const violations = [];

  // Define text/background combinations to check
  const combinations = [
    // Text on backgrounds
    { text: 'text-primary', bg: 'surface-bg-default', type: 'normal', context: 'Primary text on default background' },
    { text: 'text-primary', bg: 'surface-surface-default', type: 'normal', context: 'Primary text on surface' },
    { text: 'text-secondary', bg: 'surface-bg-default', type: 'normal', context: 'Secondary text on default background' },
    { text: 'text-secondary', bg: 'surface-surface-default', type: 'normal', context: 'Secondary text on surface' },
    { text: 'text-tertiary', bg: 'surface-bg-default', type: 'normal', context: 'Tertiary text on default background' },

    // Semantic colors on backgrounds
    { text: 'color-semantic-success-500', bg: 'color-neutral-100', type: 'normal', context: 'Success text on dark background' },
    { text: 'color-semantic-warning-500', bg: 'color-neutral-100', type: 'normal', context: 'Warning text on dark background' },
    { text: 'color-semantic-error-500', bg: 'color-neutral-100', type: 'normal', context: 'Error text on dark background' },
    { text: 'color-semantic-info-500', bg: 'color-neutral-100', type: 'normal', context: 'Info text on dark background' },

    // Brand colors
    { text: 'color-brand-teal-500', bg: 'color-neutral-100', type: 'normal', context: 'Brand teal on dark background' },
    { text: 'color-neutral-1000', bg: 'interactive-primary-default', type: 'normal', context: 'White text on primary button (interactive-primary-default)' },
  ];

  for (const combo of combinations) {
    const textColor = colors[combo.text];
    const bgColor = colors[combo.bg];

    if (!textColor || !bgColor) {
      violations.push({
        type: 'MISSING_COLOR',
        context: combo.context,
        text: combo.text,
        bg: combo.bg,
        message: `Color token not found: ${!textColor ? combo.text : combo.bg}`,
      });
      continue;
    }

    const ratio = getContrastRatio(textColor, bgColor);
    const required = combo.type === 'large' ? WCAG_AA_LARGE : WCAG_AA_NORMAL;

    if (ratio < required) {
      violations.push({
        type: 'LOW_CONTRAST',
        context: combo.context,
        text: combo.text,
        textColor,
        bg: combo.bg,
        bgColor,
        ratio: ratio.toFixed(2),
        required: required.toFixed(1),
        pass: false,
      });
    }
  }

  return violations;
}

/**
 * Generate HTML report
 * @param {Array} violations - Contrast violations
 * @param {Object} colors - All color tokens
 * @returns {string} HTML content
 */
function generateReport(violations, colors) {
  const passed = violations.length === 0;
  const totalChecks = 11; // Number of combinations we check

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VNext Contrast Check Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #121212;
      color: #ffffff;
    }
    h1 { color: #00A9A5; }
    .summary {
      background: #1e1e1e;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      border: 2px solid ${passed ? '#4CAF50' : '#F44336'};
    }
    .summary.pass { border-color: #4CAF50; }
    .summary.fail { border-color: #F44336; }
    .stat { display: inline-block; margin-right: 2rem; }
    .stat-value { font-size: 2rem; font-weight: bold; }
    .violations { margin-top: 2rem; }
    .violation {
      background: #1e1e1e;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid #F44336;
    }
    .color-swatch {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      vertical-align: middle;
      margin-right: 0.5rem;
      border: 1px solid #404040;
    }
    .ratio { font-size: 1.5rem; font-weight: bold; margin: 0.5rem 0; }
    .ratio.fail { color: #F44336; }
    .ratio.pass { color: #4CAF50; }
    code { background: #2a2a2a; padding: 0.2rem 0.4rem; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>🎨 VNext Contrast Check Report</h1>

  <div class="summary ${passed ? 'pass' : 'fail'}">
    <h2>${passed ? '✅ All Checks Passed' : '⚠️ Contrast Issues Found'}</h2>
    <div class="stat">
      <div class="stat-value">${totalChecks - violations.length}/${totalChecks}</div>
      <div>Combinations Passed</div>
    </div>
    <div class="stat">
      <div class="stat-value ${violations.length === 0 ? 'pass' : 'fail'}">${violations.length}</div>
      <div>Violations</div>
    </div>
  </div>

  ${violations.length > 0 ? `
    <div class="violations">
      <h2>Violations (WCAG AA)</h2>
      ${violations.map(v => `
        <div class="violation">
          <h3>${v.context}</h3>
          ${v.type === 'LOW_CONTRAST' ? `
            <p>
              <span class="color-swatch" style="background: ${v.textColor};"></span>
              <code>${v.text}</code> (${v.textColor})
              on
              <span class="color-swatch" style="background: ${v.bgColor};"></span>
              <code>${v.bg}</code> (${v.bgColor})
            </p>
            <p class="ratio fail">
              Contrast Ratio: <strong>${v.ratio}:1</strong> (Required: ${v.required}:1)
            </p>
            <p><strong>❌ Fails WCAG AA</strong></p>
          ` : `
            <p>${v.message}</p>
          `}
        </div>
      `).join('')}
    </div>
  ` : `
    <p>✅ All tested color combinations meet WCAG 2.2 Level AA contrast requirements.</p>
  `}

  <hr style="border-color: #404040; margin: 3rem 0;">

  <h2>Tested Combinations</h2>
  <ul>
    <li>Primary, secondary, tertiary text on default background</li>
    <li>Primary, secondary text on surface background</li>
    <li>Semantic colors (success, warning, error, info) on dark backgrounds</li>
    <li>Brand colors on backgrounds</li>
    <li>Button text contrast (white on brand colors)</li>
  </ul>

  <p style="color: #9e9e9e; margin-top: 3rem;">
    Generated: ${new Date().toLocaleString()}<br>
    Standards: WCAG 2.2 Level AA (4.5:1 for normal text, 3:1 for large text)
  </p>
</body>
</html>`;
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 VNext Contrast Checker\n');
  console.log('Loading color tokens...');

  const colors = loadColorTokens();
  console.log(`Found ${Object.keys(colors).length} color tokens\n`);

  console.log('Checking contrast ratios...');
  const violations = checkTextContrast(colors);

  if (violations.length === 0) {
    console.log('✅ All checks passed! All color combinations meet WCAG AA standards.\n');
  } else {
    console.log(`⚠️  Found ${violations.length} contrast violations:\n`);
    violations.forEach((v, i) => {
      console.log(`${i + 1}. ${v.context}`);
      if (v.type === 'LOW_CONTRAST') {
        console.log(`   Ratio: ${v.ratio}:1 (Required: ${v.required}:1)`);
      } else {
        console.log(`   ${v.message}`);
      }
    });
    console.log('');
  }

  // Generate HTML report
  const html = generateReport(violations, colors);
  const reportPath = join(__dirname, 'contrast-report.html');

  import('fs').then(({ writeFileSync }) => {
    writeFileSync(reportPath, html);
    console.log(`📊 Report saved: ${reportPath}\n`);

    process.exit(violations.length > 0 ? 1 : 0);
  });
}

main();
