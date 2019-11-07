import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  setTheme(themeName) {
    const cssText = this.CSSTextGenerator(themes[themeName]);
    this.setGlobalCSS(cssText);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  contrast(color, ratio = 0.8) {
    color = Color(color);
    return color.isDark() ? color.Lighten(ratio) : color.darken(ratio);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
    CSSTextGenerator(colors) {
    colors = {...defaults, ...colors};

    const {
      primary,
      secondary,
      tertiary,
      succes,
      warning,
      danger,
      medium,
      dark,
      light
    } = colors;

      const shadeRatio = 0.1;
      const tintRatio = 0.1;

    return `
      --ion-color-base: ${light};
      --ion-color-contrast: ${dark};

      --ion-color-primary: ${primary};
      --ion-color-primary-rgb: 56,128,255;
      --ion-color-primary-contrast: ${this.contrast(primary)};
      --ion-color-primary-contrast-rgb: 255,255,255;
      --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
      --ion-background-color: ${medium};
      --ion-text-color: ${secondary};
      `
      ;
    }
}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  succes: '#10DC60',
  warning: '#DCD535',
  danger: '#F04141',
  medium: '#989aa2',
  dark: '#222428',
  light: '#f4f5f7'
};


const themes = {
  day: {
    primary: '#39BFBD',
    secondary: '#4CEOB3',
    tertiary: '#FF5E79',
    medium: '#F4EDF2',
    dark: '#B682A5',
    light: '#34162A'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#F7F7FF',
    tertiary: '#FE5F55',
    medium: '#495867',
    dark: '#BCC2C7',
    light: '#FCFF6C'
  },
  neutral: {
    primary: '#70C1B3',
    secondary: '#F7F7FF',
    tertiary: '#FF1654',
    medium: '#247BA0',
    dark: '#BCC2C7',
    light: '#FF1654'
  },
  fun: {
    primary: '#D0C4F0',
    secondary: '#CFDFF0',
    tertiary: '#F1BBE2',
    medium: '#9B7CC3',
    dark: '#D0C4F0',
    light: '#CFDFF0'
  },
  standard: {
    primary: '#3891ff',
    secondary: '#222428',
    tertiary: '#F1BBE2',
    medium: '#FFFFFF',
    dark: '#D0C4F0',
    light: '#CFDFF0'
  }
};
