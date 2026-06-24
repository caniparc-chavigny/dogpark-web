import { describe, it, expect } from 'vitest';
import { PARK, isInsidePark } from './geofence';
import { generateLocalName, generateSessionId } from './nameGenerator';

describe('geofence', () => {
  it('reconnaît le centre du parc comme à l\'intérieur', () => {
    expect(isInsidePark(PARK.latitude, PARK.longitude)).toBe(true);
  });

  it('reconnaît un point proche (~33 m) comme à l\'intérieur', () => {
    expect(isInsidePark(PARK.latitude + 0.0003, PARK.longitude)).toBe(true);
  });

  it('reconnaît un point lointain (~220 m) comme à l\'extérieur', () => {
    expect(isInsidePark(PARK.latitude + 0.002, PARK.longitude)).toBe(false);
  });

  it('reconnaît un point à l\'autre bout du monde comme à l\'extérieur', () => {
    expect(isInsidePark(0, 0)).toBe(false);
  });
});

describe('nameGenerator', () => {
  it('génère un nom local non vide', () => {
    expect(generateLocalName().length).toBeGreaterThan(0);
  });

  it('génère des identifiants de session uniques', () => {
    expect(generateSessionId()).not.toBe(generateSessionId());
  });
});
