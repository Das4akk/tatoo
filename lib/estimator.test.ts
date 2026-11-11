import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  validateBookingForm,
  formatPriceRange,
  STYLES,
  SIZES,
} from './estimator';

test('calculateEstimate returns realistic ranges for micro fine-line', () => {
  const result = calculateEstimate('fine-line', 'micro', false);
  assert.ok(result.estimatedPriceMin > 0);
  assert.ok(result.estimatedPriceMax >= result.estimatedPriceMin);
  assert.equal(result.sessions, 1);
  assert.equal(result.consultationIncluded, true);
});

test('calculateEstimate applies style factor for large ornamental projects', () => {
  const baseResult = calculateEstimate('minimalism', 'large', false);
  const ornamentalResult = calculateEstimate('ornamental', 'large', false);
  assert.ok(ornamentalResult.estimatedPriceMin > baseResult.estimatedPriceMin);
  assert.ok(ornamentalResult.estimatedHours >= baseResult.estimatedHours);
});

test('validateBookingForm flags empty or incomplete fields', () => {
  const emptyValidation = validateBookingForm({});
  assert.equal(emptyValidation.isValid, false);
  assert.ok(emptyValidation.errors.name);
  assert.ok(emptyValidation.errors.contact);
  assert.ok(emptyValidation.errors.style);
});

test('validateBookingForm accepts valid phone or Telegram username', () => {
  const phoneValidation = validateBookingForm({
    name: 'Александра',
    contact: '+7 (999) 123-45-67',
    style: 'botanical',
  });
  assert.equal(phoneValidation.isValid, true);
  assert.deepEqual(phoneValidation.errors, {});

  const tgValidation = validateBookingForm({
    name: 'Елена',
    contact: '@elena_art',
    style: 'fine-line',
  });
  assert.equal(tgValidation.isValid, true);
});

test('formatPriceRange formats rubles cleanly', () => {
  const formatted = formatPriceRange(14000, 18000);
  assert.match(formatted, /14.*000.*–.*18.*000.*₽/);
});
