import { Anchor } from './anchor';
import { ExternalLinkIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export function MainNav() {
  return (
    <div>
      <header>
        <nav className="py-6">
          <ul className="sm:flex items-center">
            <li className="mr-6">
              <Anchor
                href="/"
                className="font-bold no-underline hover:underline"
              >
                &gt; ./eric_cecchi
              </Anchor>
            </li>

            <div className="flex-1 flex items-center mt-2 sm:mt-0">
              <li className="mr-6">
                <Anchor className="no-underline hover:underline" href="/work">
                  ./work
                </Anchor>
              </li>

              <li className="mr-6">
                <Anchor
                  href="https://managerreadme.com/readme/ericcecchi"
                  rel="noopener"
                  target="_blank"
                  className="flex items-center space-x-1 no-underline hover:underline"
                >
                  <span>./mgmt</span>
                  <ExternalLinkIcon />
                </Anchor>
              </li>

              <li className="mr-6">
                <Anchor className="no-underline hover:underline" href="/blog">
                  ./blog
                </Anchor>
              </li>

              <li className="sm:ml-auto">
                <Anchor
                  className="no-underline hover:underline"
                  href="https://www.linkedin.com/in/ericcecchi/"
                  rel="noopener"
                  target="blank"
                >
                  <LinkedInLogoIcon className="w-5 h-5" />
                </Anchor>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  );
}
