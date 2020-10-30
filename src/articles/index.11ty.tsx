import { h } from 'preact';
import { ICollections } from '@/model/collections.model';
import style from './index.module.scss';

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  collections?: ICollections;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/components/shared';
import { Header } from '@/components/header';
import { Banner } from '@/components/banner';
import { ArticleList } from '@/components/articleList';
import { ProfileImage } from '@/components/profileImage';
import { RecentArticles } from '@/components/recentArticles';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page({ collections: { articles } }: IData) {
  return (
    <Html
      title="Articles - 11ty"
      cssFile={this.stylesheet('articles/index.11ty.css')}
      jsPath="articleList.entry.js"
    >
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <Banner>
            <h1>Articles</h1>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <ArticleList className={style.articles} articles={articles} />
              <aside>
                <ProfileImage className={style.profile} />
                <div class={style.recent}>
                  <h3 class={style.heading}>Recent Articles</h3>
                  <RecentArticles articles={articles} />
                </div>
              </aside>
            </div>
          </div>
        </main>
        <Footer />
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
