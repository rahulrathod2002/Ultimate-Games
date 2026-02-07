import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const resolveAssetUri = async (moduleRef) => {
  const asset = Asset.fromModule(moduleRef);
  await asset.downloadAsync();
  return asset.localUri ?? asset.uri;
};

const readTextAsset = async (moduleRef) => {
  if (!moduleRef) {
    return '';
  }
  const uri = await resolveAssetUri(moduleRef);
  return FileSystem.readAsStringAsync(uri);
};

const inlineCss = (html, css) => {
  if (!css) {
    return html;
  }
  return html.replace(/<link[^>]+href="[^"]+"[^>]*>/i, `<style>${css}</style>`);
};

const inlineJs = (html, js) => {
  if (!js) {
    return html;
  }
  return html.replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/i, `<script>${js}</script>`);
};

export const buildWebGameHtml = async ({ html, css, js, replacements = {} }) => {
  const [htmlText, cssText, jsText] = await Promise.all([
    readTextAsset(html),
    readTextAsset(css),
    readTextAsset(js),
  ]);

  let merged = inlineCss(htmlText, cssText);
  merged = inlineJs(merged, jsText);

  const resolvedEntries = await Promise.all(
    Object.entries(replacements).map(async ([needle, moduleRef]) => {
      const uri = await resolveAssetUri(moduleRef);
      return [needle, uri];
    })
  );

  resolvedEntries.forEach(([needle, uri]) => {
    merged = merged.split(needle).join(uri);
  });

  return merged;
};
