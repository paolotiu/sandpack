/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SandpackCodeEditor,
  SandpackThemeProvider,
  useActiveCode,
  SandpackProvider,
  ClasserProvider,
  SandpackPreview,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { CardTitle, CardDescription } from "../../common";

import { useLayoutExampleContext } from "./LayoutContext";
import {
  Row,
  Content,
  CodeWrapper,
  SandpackContainerPlaceholder,
  SandpackContainerMobile,
  FadeAnimation,
  THRESHOLD_VIEW,
} from "./common";

export const LayoutExample: React.FC = () => {
  const { ref, inView } = useInView({ threshold: THRESHOLD_VIEW });

  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { layoutFiles, setLayoutFiles, setVisibility } =
    useLayoutExampleContext();

  useEffect(() => {
    setLayoutFiles(sandpack.activePath, code);
  }, [code]);

  useEffect(() => {
    Object.entries(layoutFiles).map(([filename, fileCode]) => {
      sandpack.updateFile(filename, fileCode);
    });
  }, []);

  useEffect(() => {
    setVisibility(inView);
  }, [inView]);

  return (
    <FadeAnimation>
      <Row ref={ref}>
        <Content>
          <CardTitle>Build your own Sandpack UI</CardTitle>
          <CardDescription>
            If you want to fully customise the experience, you can build the UI
            yourself. The library exports a set of{" "}
            <a
              className="external-link"
              href="https://sandpack.codesandbox.io/docs/advanced-usage/components#layout"
              rel="noreferrer"
              target="_blank"
            >
              composable components
            </a>{" "}
            and hooks that allow you to tailor the editing experience to your
            own needs.
          </CardDescription>

          <CodeWrapper
            css={{
              ".sp-tabs": {
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              },

              ".sp-code-editor": {
                borderRadius: 0,
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
                padding: "0 15px",
              },
            }}
          >
            <SandpackThemeProvider theme="sandpack-dark">
              <SandpackCodeEditor />
            </SandpackThemeProvider>
          </CodeWrapper>
        </Content>

        <SandpackContainerPlaceholder />

        <SandpackContainerMobile css={{ ".custom-layout": { height: "50vh" } }}>
          <SandpackProvider
            customSetup={{
              files: layoutFiles,
              dependencies: { "@codesandbox/sandpack-react": "latest" },
            }}
            template="react"
          >
            <ClasserProvider
              classes={{
                "sp-layout": "custom-layout",
                "sp-stack": "custom-stack",
                "sp-wrapper": "custom-wrapper",
              }}
            >
              <SandpackThemeProvider>
                <SandpackLayout>
                  <SandpackPreview />
                </SandpackLayout>
              </SandpackThemeProvider>
            </ClasserProvider>
          </SandpackProvider>
        </SandpackContainerMobile>
      </Row>
    </FadeAnimation>
  );
};
