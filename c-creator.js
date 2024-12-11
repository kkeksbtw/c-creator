/**
 * Copyright 2024 kkeksbtw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";
import { WiredCheckbox } from "wired-elements";

/**
 * `c-creator`
 *
 * @demo index.html
 * @element c-creator
 */
export class CCreator extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "c-creator";
  }

  constructor() {
    super();
    this.title = "Design Your Character";
    this.characterSettings = {
      seed: "00000000",
      base: 0, // 0 for no hair, 1 for hair
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
    };
    this._applySeedToSettings(); // Ensure consistent character style on initialization
  }

  _applySeedToSettings() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));

    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;

    this.requestUpdate(); // Ensure UI updates after applying settings
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--c-creator-label-font-size, var(--ddd-font-size-s));
        }

        .slider-container {
          display: flex; /* Indicator: Added to stack sliders */
          flex-direction: column; /* Makes items stack vertically */
          gap: 16px; /* Adds space between sliders */
        }

        .slider-container label {
          margin-bottom: 4px; /* Adds space between label and slider */
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <h3><span>${this.t.title}:</span> ${this.title}</h3>
      <rpg-character
        base="${this.characterSettings.base}"
        face="${this.characterSettings.face}"
        faceitem="${this.characterSettings.faceitem}"
        hair="${this.characterSettings.hair}"
        pants="${this.characterSettings.pants}"
        shirt="${this.characterSettings.shirt}"
        skin="${this.characterSettings.skin}"
        hatColor="${this.characterSettings.hatColor}"
        .fire="${this.characterSettings.fire}"
        .walking="${this.characterSettings.walking}"
        style="
              --character-size: ${this.characterSettings.size}px;
              --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);
            "
      ></rpg-character>
      <div class="slider-container">
        <label> hair </label>
        <wired-checkbox
          id="hair"
          value="${this.characterSettings.hair}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("hair", parseInt(e.detail.value))}"
        ></wired-checkbox>
        <label> walking </label>
        <wired-checkbox
          ?checked="${this.characterSettings.walking}"
          @change="${(e) => this._updateSetting("walking", e.target.checked)}"
        ></wired-checkbox
        >>
        <label> fire </label>
        <wired-checkbox
          ?checked="${this.characterSettings.fire}"
          @change="${(e) => this._updateSetting("fire", e.target.checked)}"
        ></wired-checkbox>
        <label> base </label>
        <wired-slider></wired-slider>
        <label> face </label>
        <wired-slider
          id="face"
          value="${this.characterSettings.face}"
          min="0"
          max="5"
          @change="${(e) =>
            this._updateSetting("face", parseInt(e.detail.value))}"
        ></wired-slider>
        <label> face item </label>
        <wired-slider
          id="faceitem"
          value="${this.characterSettings.faceitem}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("faceitem", parseInt(e.detail.value))}"
        ></wired-slider>
        <label> pants </label>
        <wired-slider
          id="pants"
          value="${this.characterSettings.pants}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("pants", parseInt(e.detail.value))}"
        ></wired-slider>
        <label> shirt </label>
        <wired-slider
          id="shirt"
          value="${this.characterSettings.shirt}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("shirt", parseInt(e.detail.value))}"
        ></wired-slider>
        <label> skin </label>
        <wired-slider
          id="skin"
          value="${this.characterSettings.skin}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("skin", parseInt(e.detail.value))}"
        ></wired-slider>
        <label> hatColor </label>
        <wired-slider
          id="hatColor"
          value="${this.characterSettings.hatColor}"
          min="0"
          max="9"
          @change="${(e) =>
            this._updateSetting("hatColor", parseInt(e.detail.value))}"
        ></wired-slider>
      </div>
    </div>`;
  }

  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin, hatColor } =
      this.characterSettings;
    this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._generateSeed();
    this.requestUpdate();
  }

  _updateSetting(key, value) {
    this.characterSettings[key] = value;
    this.requestUpdate();
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CCreator.tag, CCreator);
