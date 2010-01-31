module ApplicationHelper
  
  def nav_link(text, path, options = {})
    class_name = options[:class] if options[:class]
    class_name = "#{class_name} current".strip if current_page == "/#{path}"
    
    if class_name
      link_to text, path, :class => class_name
    else
      link_to text, path
    end
  end  
  
  def nav_links(links)    
    list = []
    links.each_with_index do |link,i|      
      list << "<li>#{nav_link(links[i], links[i+1])}</li>\n" unless (i%2>0)
    end

    list.first.gsub! '<li>', '<li class="first">'
    list.last.gsub! '<li>', '<li class="last">'
    return list    
  end
  
  def underscore(word)
    word.to_s.gsub(/ /, '_').
      gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
      gsub(/([a-z\d])([A-Z])/,'\1_\2').
      tr("-", "_").
      downcase
  end

end