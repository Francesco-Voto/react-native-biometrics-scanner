require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

new_arch_enable = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

Pod::Spec.new do |s|
  s.name            = "react-native-biometrics-scanner"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
 
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"
  s.framework =  "LocalAuthentication"

  

   if new_arch_enable
    # The following lines are required by the New Architecture.
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    if respond_to?(:install_modules_dependencies,true)
    install_modules_dependencies(s)
    else
    # ... other dependencies ...
    s.dependency "ReactCommon/turbomodule/core"
    end
    s.platforms       = { :ios => "13.4" }
   else
    s.platforms       = { :ios => "12.4" }
   end
end
