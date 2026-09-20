// Layout for the unprefixed entry points (/, /support/, /privacy/). The
// localized pages carry their own root layout under app/[lang].

export const viewport = { themeColor: "#07111c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#07111c", color: "#f0faf5", font: "16px/1.6 system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
