/* eslint-disable react/no-danger */
import { h } from 'preact';
import { ICollections } from '@/modules/shared/model/collections.model';
import { IPage, IData } from '@/modules/shared/model/page.model';
import style from './article.module.scss';
import '@/styles/monokai.css';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps extends IData {
  title: string;
  excerpt: string;
  bannerImage?: string;
  thumbImage: string;
  content: string;
  cssPath: string;
  jsPath: string;
  tags: string[];
  collections?: ICollections;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/modules/shared/components';
import { Header } from '@/modules/shared/components/header';
import { Banner } from '@/modules/shared/components/banner';
import { ProfileImage } from '@/modules/shared/components/profileImage';
import { RecentArticles } from '@/modules/articles/components/recentArticles';
import { Footer } from '@/modules/shared/components/footer';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

function Page(
  this: IPage,
  {
    siteMeta,
    mainMenu: { menuLinks },
    socialMenu: { socialLinks },
    title,
    excerpt,
    thumbImage,
    bannerImage,
    content,
    cssPath = 'layouts/article.11ty.css',
    jsPath = 'articles/article.entry.js',
    tags,
    collections: { articles },
  }: IProps
) {
  const inlineCss = this.getAssetContents([cssPath]);

  return (
    <Html
      title={`${title} - ${siteMeta.pageTitle}`}
      summary={excerpt}
      image={`articles/_images/${thumbImage}`}
      inlineCss={inlineCss}
      jsPath={jsPath}
    >
      <div class={style.wrapper}>
        <Header menuLinks={menuLinks} />
        <main class={style.content}>
          <Banner bannerImage={bannerImage}>
            <h1>{title}</h1>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <article>
                {/* {!banner && <h1 class={style.title}>{title}</h1>} */}
                <div class={style.article} dangerouslySetInnerHTML={{ __html: content }} />
              </article>
              <aside>
                <ProfileImage className={style.profile} />
                <nav class={style.recent}>
                  <h3 class={style.heading}>Recent Articles</h3>
                  <RecentArticles articles={articles} />
                </nav>
                {/* <h3 class={style.heading}>Tags</h3>
                <nav class={style.tags}>
                  {tags.map((tag) => (
                    <span href={`/articles/${tag}`}>{tag}</span>
                  ))}
                </nav> */}
              </aside>
            </div>
          </div>
        </main>
        <Footer socialLinks={socialLinks} />
      </div>
    </Html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = Page;
