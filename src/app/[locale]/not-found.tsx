import Link from "next/link";

/**
 * Not-found page for everything under /[locale].
 *
 * Without this, `notFound()` falls through to Next's built-in page, which
 * renders its own <html> wrapper. The root layout (src/app/layout.tsx)
 * deliberately returns bare children — <html> lives in [locale]/layout.tsx
 * — so the two collide and React throws
 * "HierarchyRequestError: Only one element on document allowed",
 * blanking the page instead of showing a 404. Keeping a not-found inside
 * this segment means it renders within the locale layout and stays inside
 * the normal site chrome.
 */
export default function NotFound() {
  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Хуудас олдсонгүй</h1>
          <p className="page-subtitle">
            Таны хайсан хуудас байхгүй эсвэл нэр нь өөрчлөгдсөн байна.
          </p>
        </div>
      </section>

      <div className="page-container">
        <div className="content-area">
          <p>
            <Link href="/" className="noajax">
              Нүүр хуудас руу буцах
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
