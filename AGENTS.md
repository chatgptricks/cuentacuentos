# Cuentacuentos

- Trabaja en `/Users/tbnalfaro/Developer/Codex Projects/24 Cuentacuentos`. La ruta de Desktop es un enlace; no crees ni muevas proyectos a Desktop o Documents.
- Conserva la compatibilidad de la API y de los cuentos, personajes y preferencias guardados. Los identificadores originales y sus posiciones de atlas deben seguir funcionando.
- **Siempre despliega las mejoras solicitadas a producción**, después de completar `npm test`, `npm run build` y la revisión visual correspondiente. El usuario ya autorizó este despliegue; no requiere una aprobación adicional.
- Publica mediante `main` y el workflow de GitHub Actions Pages en `.github/workflows/pages.yml`, que compila y despliega `dist`. Comprueba que el workflow termine correctamente y verifica la app publicada en `https://chatgptricks.github.io/cuentacuentos/`.
